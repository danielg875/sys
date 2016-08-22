import React,{ Component } from 'react'

export default class Option extends Component {
  constructor(props){
    super(props)
    this.editOption = this.editOption.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
  }

  editOption(e){
    let index = $(e.target).closest(".row").attr("data-index"),
    value = e.target.value
    this.props.editOption(this.props.questionIndex,index,value)
  }

  deleteOption(e){
    let index = $(e.target).closest(".row").attr("data-index")
    this.props.deleteOption(this.props.questionIndex,index)
  }

  render(){
    return (
      <div className="row"  data-index={this.props.index}>
        <div className='col col-md-8'>
          <input className="w-input entry-standard" value={this.props.option} placeholder="Option text" type="text" onChange={this.editOption}/>
        </div>
        <div className="col col-md-4">
          <button type='button' className="proto-button proto-smaller" onClick={this.deleteOption}>Remove</button>
        </div>
      </div>
    )
  }
}
