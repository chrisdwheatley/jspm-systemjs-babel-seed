var fragment = `<example>
                  <h1>jspm, SystemJS, Babel Seed</h1>
                </example>`;

export default (mainElement) => {
	mainElement.insertAdjacentHTML('afterbegin', fragment);
};
