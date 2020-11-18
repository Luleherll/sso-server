import React from 'react';
import axios from 'axios';

const page =() => {
const handleSubmit = async e => {
    e.preventDefault()
    try {
        const {src} = Object.fromEntries(new URLSearchParams(window.location.search))

        const res = await axios.post(`/api/login?src=${src}`, {email: 'lule@dev.com', password: 'test'});
        console.log(res.data);
        if (res.data.identifier) {
            window.location.href = `${src}?sso=${res.data.identifier}`
        }
    } catch (error) {
        console.log(error);
    }
    const form = new FormData(e.target);
    console.log(form);
} 
return <div>
login
<form onSubmit={handleSubmit} enctype="multipart/form-data">
    <input name='email' />
    <input name='password' type='password' />
    <button type='submit'>submit</button>
</form>
</div>
}

export default page