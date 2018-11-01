import React from "react";
import Simple from "./examples/Simple";
import AnimationCloth from "./examples/AnimationCloth";

const examples = [
    {
        name: "Simple",
        component: Simple
    },
    {
        name: "AnimationCloth",
        component: AnimationCloth
    }
];

class ExamplePicker extends React.PureComponent {
    constructor(...args) {
        super(...args);

        this.state = {
            selectedExample: 0,
        };
    }

    _onExampleSelectChange = (event) => {
        this.setState({
            selectedExample: event.target.value,
        })
    };

    render() {
        const selectedExample = this.state.selectedExample;
        const SelectedComponent = examples[selectedExample].component;

        return <div>
            <div>
                <label>Choose an example:&nbsp;
                    <select onChange={this._onExampleSelectChange} value={selectedExample}>
                        {examples.map((example, i) => <option key={i} value={i}>{example.name}</option>)}
                    </select>
                </label>
            </div>
            <br/>
            <div>
                <SelectedComponent
                    width={500}
                    height={600}
                />
            </div>
        </div>;
    }
}

module.exports = ExamplePicker;