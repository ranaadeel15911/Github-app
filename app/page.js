'use client'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [user,setUser] = useState(null)
  const [getUser,setGetUser] = useState({})
  const [followers ,setFollowers] = useState([])
  const handleInput = (e)=>{
setUser(e.target.value)
// console.log(user)
  }
const handleSearch = async()=>{
const gotUser =await axios.get(`https://api.github.com/users/${user}`)
console.log(gotUser.data)
setGetUser(gotUser.data)
setFollowers([])
}
const handleFollowers = async()=>{

  const getfollowers =await axios.get(getUser.followers_url)
  console.log(getfollowers)
  setFollowers(getfollowers.data)

}
  return (
    <>
    <h1>Github App</h1>
    <label htmlFor=""><h1 style={{display:'inline'}}>Enter User Name:</h1></label>
    <input type="text" style={{padding:5,width:500,height:35,fontSize:30}} onChange={handleInput}/>
    <button onClick={handleSearch} style={{padding:5,margin:14,fontSize:30}} >Search</button>
    <h1>Github User</h1>
    <img src={getUser.avatar_url} alt="" /> <br />
   <h1 style={{display:'inline'}}> {getUser.login}</h1> <br />
    <h1 style={{display:'inline'}}>{getUser.bio}</h1> <br />
    <h1 style={{display:'inline'}}>{getUser.id}</h1>
    <br />{getUser.login && <button style={{padding:5,margin:4,fontSize:30}} onClick={handleFollowers}>Get Followers</button> }
    <hr />
    {
      followers.length >=1 &&
    <tr>
  <th>Avatar</th>
  <th>Name</th>
  <th>Bio</th>
  <th>Id</th>
</tr>
    }
    {followers.map((follows)=>{
      return(
        <>
<tr>
  <td><img src={follows.avatar_url} width={60} alt="" /></td>
  <td>{follows.type}</td>
  <td>{follows.login}</td>
  <td>{follows.id}</td>
</tr>
</>
)
    })}
    </>
  )
}
