import React from 'react';
class ToDo extends React.Component{
    state = {    
        edit: false,    
        id: null,    
        mockData: [{
             id: '1',
             title: 'Buy Milk',
             done: false,
             date: new Date()
         }, 
         {
             id: '2',
             title: 'Meeting with Ali',
             done: false,
             date: new Date()
         }, 
         {
             id: '3',
             title: 'Tea break',  
             done: false, 
             date: new Date() 
         }, 
         {
             id: '4',
             title: 'Go for a run.',
             done: false,
             date: new Date()
         }],
         title:'',
         editTitle:''
       }
    onSubmitHandle = (e)=>{
        e.preventDefault();
        const title = e.target.item.value;
        this.setState({
            mockData:[...this.state.mockData,{id:Date.now(),title:title,done:false,date:new Date()}]
        });
        this.setState({title:''});
    }

    onTitleChange = (e)=>{
        this.setState({title:e.target.value});
    }

    onEditTitleChange = (e)=>{
        this.setState({editTitle:e.target.value});
    }

    deleteItem = (id)=>{
        this.setState({mockData:this.state.mockData.filter((item)=>{
            return item.id!==id
        })})
    }

    renderEditForm = ()=>{
        if(this.state.edit)
        return(<form onSubmit={this.onUpdateHandle}>
            <input type="text" name="updatedItem" value={this.state.editTitle} onChange={this.onEditTitleChange}/>
            <button>Update</button>
        </form>);
    }

    onUpdateHandle = (e)=>{
        e.preventDefault();
        //get item to edit
        this.setState({
            mockData:this.state.mockData.map((item)=>{
                if(item.id===this.state.id){
                    console.log(e.target.updatedItem.value,this.state.editTitle);
                    item['title'] = e.target.updatedItem.value;
                    return item; 
                }
                return item;
            }),
            edit:false
        })
    }
    
    onEditHandle=(id,title)=>{
        this.setState({edit:true,id,editTitle:title});
    }
    onCompleteHandle=(id)=>{
        this.setState({
            mockData:this.state.mockData.map((item)=>{
                if(item.id===id){
                    item['done'] = true;
                    return item; 
                }
                return item;
            })
        })
    }
    render(){
        const style ={textDecoration:'line-through'};
        return(
            <div>
                {this.renderEditForm()}
                <form onSubmit={this.onSubmitHandle}>
                    <input type="text" name="item" className="item" value={this.state.title} onChange={this.onTitleChange}/>        
                    <button className="btn-add-item">Add</button>
                </form>
                <ul style={{listStyleType:'none'}}>
                    {this.state.mockData.map((item=>{
                        const temp = item.done ?style:null;
                        return(
                            <li key={item.id} style={temp}>
                                {item.title}
                                <button onClick={()=>{this.deleteItem(item.id)}}>Delete</button>
                                <button onClick={()=>{this.onEditHandle(item.id, item.title)}}>Edit</button>
                                <button onClick={()=>{this.onCompleteHandle(item.id)}}>Complete</button>
                            </li>
                        );
                    }))}
                </ul>
            </div>            
        );
    }
}
export default ToDo;