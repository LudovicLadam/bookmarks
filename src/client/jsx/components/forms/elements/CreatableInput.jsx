import _ from 'lodash'
import React, { Component } from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

const createOption = (label) => ({
  label,
  value: label,
});

class CreatableInputOnly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      value: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    const { values } = this.props

    if (!_.isEmpty(values)) {
      const options = []
      _.map(values, v => {
        options.push(createOption(v))
      })
      this.setState({
        value: options
      })
    }
  }

  handleChange(value) {
    const { onChange } = this.props

    this.setState({ value })
    onChange(_.map(value, 'value'))
  }

  handleInputChange(inputValue) {
    this.setState({ inputValue })
  }

  handleKeyDown(event) {
    const { onChange } = this.props
    const { inputValue, value } = this.state

    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const values = [...value, createOption(inputValue)]
        onChange(_.map(values, 'value'))

        this.setState({
          inputValue: '',
          value: values
        });
        event.preventDefault()
    }
  }

  render() {
    const { placeholder } = this.props
    const { inputValue, value } = this.state
    return (
      <CreatableSelect
        components={{
          DropdownIndicator: null
        }}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder={placeholder}
        value={value}
      />
    );
  }
}

export default CreatableInputOnly
