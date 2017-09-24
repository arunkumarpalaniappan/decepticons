import React from 'react';
import '../css/custom.css';
import {Row,Input} from 'react-materialize';

const Cards = React.createClass({
  getInitialState: function() {
    return ({data: [], requestSent: false,defaultState:[],length: 200,startKey : 0});
  }, 

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleOnScroll);

    this.initFakeData();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleOnScroll);
  },

  initFakeData: function() {
    let newlength = this.state.data.length+(this.state.startKey*20);
    var data = this.createFakeData(newlength, 300);

    this.setState({data: data,defaultState: data,length:newlength});
  },

  createFakeData: function(startKey, counter) {
    var i = 0;
    var data = [];
    for (i = 0; i < counter; i=i+this.state.startKey) {
      var fakeData = (<div key={this.state.startKey+i} id={this.state.startKey+i} className="col-md-4 animate"><div className="data-info"><div className="data-text">Data {startKey+i}</div></div></div>);
      data.push(fakeData);
    }

    return data;
  },

  querySearchResult: function() {
    if (this.state.requestSent) {
      return;
    }

    setTimeout(this.doQuery, 2000);

    this.setState({requestSent: true});
  },

  doQuery: function() {
        var fakeData = this.createFakeData(this.state.length, 20*this.state.startKey);
        var newData = this.state.data.concat(fakeData);
        this.setState({data: newData, requestSent: false});
  },  

  filterdivide: function(value) {
    if (value == 0) {
      this.setState({data:this.state.defaultState,length:200,startKey: 0})
    } else {
     var  data = this.createFakeData(this.state.length,this.state.length+50);
      this.setState({data:data,startKey:value,length:this.state.length+50})
    }    
  }, 

  filterdivideby: function(event) {
    this.filterdivide(parseFloat(event.target.id.replace('f','')));
  },

  handleOnScroll: function() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight-2000);

    if (scrolledToBottom) {
      this.querySearchResult();
    }
  },

  render: function() {
    return (
      <div>  
        
        <div className="container">
        <div className="col-md-12">
            <input id="f3" onChange={this.filterdivideby} type="radio" name="filter" />
            <label htmlFor="f3">Filter 3</label>
          <input id="f10" onChange={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f10">Filter 10</label>
          <input id="f5" onChange={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f5">Filter 5</label>
          <input id="f1" onChange={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f1">Filter 1</label>
          <input id="f15" onChange={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f15">Filter 15</label>
          <input id="f0" onChange={this.filterdivideby} type="radio" name="filter"/>
          <label htmlFor="f0">Remove Filter</label>
          </div>
          {this.state.data}
        </div>
        {(() => {
          if (this.state.requestSent) {
            return(
              <div className="data-loading">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
            );
          } else {
            return(
              <div className="data-loading"></div>
            );
          }
        })()}
      </div>
    );
  }
});


export default Cards;
