
build: components index.js angular-arrangeable-array.css template.js
	@component build --dev -v

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
