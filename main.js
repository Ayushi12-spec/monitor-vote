
let ayushiVotes=0;
let akanshaVotes=0;
let mansiVotes=0;
let totalVotes=0;
let link="https://crudcrud.com/api/050658ab9fa14ecba0817a6825473d39/student"
document.getElementById("Vote").addEventListener("click", (event)=>{
    VoteForMonitor(event)


})

async function refresh(){
    try {
        let result=await axios.get(link)
        for(let i=0;i<result.data.length;i++){
            updateVotes(result.data[i])
        }
        
    } catch (error) {
        console.log("error")
        
    }
}
refresh()
async function VoteForMonitor(event){
    event.preventDefault()
    let name=document.getElementById("name").value
    let candidate=document.getElementById("candidate").value
    let obj ={
        name,
        candidate,

    }
    try {
        let result=await axios.post(link, obj)
        updateVotes(result.data)
        
    } catch (error) {
        console.log(error)
        
    }
} 
function updateVotes(obj){

    let child=document.createElement("li")
    child.textContent=obj.name
    let Ayushi=document.getElementById("Ayushi")
    let Akansha=document.getElementById("Akansha")
    let Mansi=document.getElementById("Mansi")
    let a1=document.getElementById("a1")
    let a2=document.getElementById("a2")
    let m1=document.getElementById("m1")
    let deleteBtn=document.createElement("button")
    deleteBtn.appendChild(document.createTextNode("X"))
    child.appendChild(deleteBtn)
    if(obj.candidate =="Ayushi"){
        Ayushi.appendChild(child)
        ayushiVotes+=1;
        a1.innerHTML=`votes:${ayushiVotes}`
        totalVotes+=1;
        console.log(ayushiVotes, totalVotes)
        updateTotalVotes()
    }
  if(obj.candidate=="Akansha"){
    Akansha.appendChild(child)
        akanshaVotes+=1;
        a2.innerHTML=`votes:${akanshaVotes}`
        totalVotes+=1;
        updateTotalVotes()

  }
  if(obj.candidate=="Mansi"){
    Mansi.appendChild(child)
        mansiVotes+=1;
        m1.innerHTML=`votes:${mansiVotes}`
        totalVotes+=1;
        updateTotalVotes()

  }
   deleteBtn.onclick=async ()=>{
    if(obj.candidate=="Ayushi"){
     child.remove()
     ayushiVotes=ayushiVotes-1;
     a1.innerHTML`votes:${ayushiVotes}`
     totalVotes=totalVotes-1;
     updateTotalVotes()
     
    }
    if(obj.candidate=="Akansha"){
        child.remove()
        akanshaVotes=akanshaVotes-1;
        a2.innerHTML`votes:${akanshaVotes}`
        totalVotes=totalVotes-1;
        updateTotalVotes()
        
       }
       if(obj.candidate=="Mansi"){
        child.remove()
        mansiVotes=mansiVotes-1;
        m1.innerHTML`votes:${mansiVotes}`
        totalVotes=totalVotes-1;
        updateTotalVotes()
        
       }
       console.log(obj._id, "ye h id")
       await axios.delete(link + "/"+obj._id)
   }

}

function updateTotalVotes()
{
    let parent=document.getElementById("total")
    parent.innerHTML=`totalVotes:${totalVotes}`
    
}