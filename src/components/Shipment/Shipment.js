import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example")); 
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    return (
        <form className='ship-from' onSubmit={handleSubmit(onSubmit)}>
            <input name="example" defaultValue="test" ref={register} />

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
            {errors.email && <span className='error'>This field is required</span>}

            <input name="phone" ref={register({ required: true })} />
            {errors.phone && <span className='error'>This field is required</span>}
            
            <input type="submit" />
        </form>
  );
};

export default Shipment;