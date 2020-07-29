---
title: Components, State and Props
id: 9JkGPIRF8nDTMRF76x2Xc
---

**Setting attributes**

``` jsx
class MyComponent extends Component {
	state = {
		imageUrl: 'https://example/image.jpg'
		imageAlt: 'An example image'
	};

	render() {
		return (
			<img src={this.state.imageUrl} alt={this.state.imageAlt}>
		);
		}
	}
```
