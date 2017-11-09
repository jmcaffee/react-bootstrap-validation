import React from 'react';
import { FormControl } from 'react-bootstrap';

export default class ValidatedInput extends React.Component {
    constructor(props) {
        super(props);

        const {validationEvent, validate, errorHelp, _registerInput, _unregisterInput, ...rest} = props;
        this._registerInput = _registerInput;
        this._unregisterInput = _unregisterInput;
        if (!this._registerInput || !this._unregisterInput) {
            throw new Error('Input must be placed inside the Form component');
        }
    }

    componentWillMount() {
        this._registerInput(this);
    }

    componentWillUnmount() {
        this._unregisterInput(this);
    }

    render() {
        // Capture props at time of render and strip local component data.
        const {validationEvent, validate, errorHelp, _registerInput, _unregisterInput, ...inputProps} = this.props;
        return <FormControl ref='control' {...inputProps}>{this.props.children}</FormControl>;
    }
}

ValidatedInput.propTypes = {
    name           : React.PropTypes.string.isRequired,
    validationEvent: React.PropTypes.oneOf([
        '', 'onChange', 'onBlur', 'onFocus'
    ]),
    validate       : React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.string
    ]),
    errorHelp      : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ])
};

ValidatedInput.defaultProps = {
    validationEvent: ''
};
