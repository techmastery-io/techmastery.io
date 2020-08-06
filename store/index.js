export const state = () => ({
  roadmaps: {},
  theme: 'light',
  roadmapsIndex: {},
  featuredRoadmaps: [],
  featuredTechRoadmaps: [],
  showSideMenu: false,
  GITHUB_URL: 'https://github.com/jonathanmach/techmastery.io'
})

export const getters = {
  getCore: (state) => ({ roadmapSlug, coreSlug }) => {
    return state.roadmaps[roadmapSlug].coreList[coreSlug]
  },
  getRodmapInfo: (state) => (roadmapSlug) => {
    return state.roadmapsIndex[roadmapSlug]
  },
  getCoreProgress: (state) => (conceptIdList) => {
    if (!state.auth.loggedIn) {
      return 0
    }
    // Receives a list of concepts id's, compares with the state.completedConcepts
    // and returns the % of completed concepts
    const totalConcepts = conceptIdList.length
    // Find values that intersect
    const doneConcepts = state.auth.user.completedConcepts.filter((concept) =>
      conceptIdList.includes(concept.id)
    )
    // return the progress percentage
    return Math.round((doneConcepts.length / totalConcepts) * 100)
  },

  isConceptCompleted: (state) => (conceptId) => {
    // Check if given conceptId is in state.completedConcepts
    const foundConcept = state.auth.user.completedConcepts.find(
      (concept) => concept.id === conceptId
    )
    return !!foundConcept
  },
  getTheme: (state) => {
    return state.theme
  }
}

export const mutations = {
  SET_ROADMAPS_INDEX: (state, payload) => {
    state.roadmapsIndex = payload
  },

  SET_COMPLETED_CONCEPTS: (state, completedConcepts) => {
    // Set completed concepts list on first access/login
    state.auth.user.completedConcepts = completedConcepts
  },
  SET_FEATURED_ROADMAPS: (
    state,
    { featuredRoadmaps, featuredTechRoadmaps }
  ) => {
    state.featuredRoadmaps = featuredRoadmaps
    state.featuredTechRoadmaps = featuredTechRoadmaps
  },
  MARK_CONCEPT_AS_DONE: (state, { conceptId }) => {
    state.auth.user.completedConcepts.push({ id: conceptId })
  },
  MARK_CONCEPT_AS_NOT_DONE: (state, { conceptId }) => {
    const conceptIndex = state.auth.user.completedConcepts.findIndex(
      (element) => element.id === conceptId
    )
    state.auth.user.completedConcepts.splice(conceptIndex, 1)
  },
  ADD_ROADMAP_DATA: (state, { slug, roadmap }) => {
    const data = { ...roadmap }

    const coreList = {}
    roadmap.sections.forEach((section) => {
      section.cores.forEach((core) => {
        coreList[core.slug] = core
      })
    })
    data.coreList = coreList

    state.roadmaps[slug] = data
  },
  SET_THEME: (state, theme) => {
    state.theme = theme
  },
  TOGGLE_SIDE_MENU: (state) => {
    state.showSideMenu = !state.showSideMenu
  }
}

export const actions = {
  async getRoadmapData({ commit }, { slug }) {
    const roadmap = await require(`@/content/en/${slug}.json`)
    commit('ADD_ROADMAP_DATA', { slug, roadmap })
  },
  markConceptAsDone({ commit }, { conceptId }) {
    commit('MARK_CONCEPT_AS_DONE', { conceptId })

    this.$axios.post(`/users/completed-concepts/${conceptId}`).catch(() => {
      // Undo on error
      commit('MARK_CONCEPT_AS_NOT_DONE', { conceptId })
    })
  },
  removeMarkedConcept({ commit }, { conceptId }) {
    commit('MARK_CONCEPT_AS_NOT_DONE', { conceptId })

    this.$axios.delete(`/users/completed-concepts/${conceptId}`).catch(() => {
      // Undo on error
      commit('MARK_CONCEPT_AS_DONE', { conceptId })
    })
  },

  async getRoadmapList({ commit }) {
    const {
      roadmapsIndex,
      featuredRoadmaps,
      featuredTechRoadmaps
    } = await import(`@/content/en/index.js`)

    commit('SET_ROADMAPS_INDEX', roadmapsIndex)
    commit('SET_FEATURED_ROADMAPS', { featuredRoadmaps, featuredTechRoadmaps })
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('getRoadmapList')
  }
}
