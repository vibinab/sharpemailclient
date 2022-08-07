import { fireEvent, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import {Signup} from "./Signup"

test('renders heading', () => {
  render(<Signup />);
  const linkElement = screen.getByText(/Signupform/i);
  expect(linkElement).toBeInTheDocument();
});


test('render form password input field using placeholder', ()=> {
render(<Signup />) 

const inputelement=screen.getByPlaceholderText(/password/i);
expect(inputelement).toBeInTheDocument()


})

test('render form email checking attribue', ()=> {
    render(<Signup />) 
    
    const inputelement=screen.getByPlaceholderText(/email/i);
    expect(inputelement).toHaveAttribute('type','email')
    
    
    })



test('should be able to type in input',()=>{
    render(<Signup />)
const inputelement=screen.getByPlaceholderText(/email/i);
fireEvent.change(inputelement,{target:{value:"test"}})
expect(inputelement.value).toBe("test")

})

test('check btn',()=> {

    
    render(<Signup></Signup>)
    
    
    const btn=screen.getByText(/Signbutton/i);

   expect(btn).toBeInTheDocument()

})
