import { fireEvent, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import  { Login } from "./Login"
test('renders login heading', () => {
    render(<Login />);
    const linkElement = screen.getByText(/Loginform/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('renders login email', () => {
    render(<Login />);
    const linkElement = screen.getByText(/email/i);
    expect(linkElement).toBeInTheDocument();
    const email=screen.getByLabelText(/email:/i)
    expect(email).toHaveAttribute('type','email')
  });

  test('renders login password', () => {
    render(<Login />);
    const linkElement = screen.getByText(/password/i);
    expect(linkElement).toBeInTheDocument();
    const password=screen.getByLabelText(/password:/i)
    expect(password).toHaveAttribute('type','password')
  });

  test('should be able to type in login password input',()=>{
    render(<Login />)

    const element=screen.getByLabelText(/password:/i)
fireEvent.change(element,{target:{value:"abc@1"}})
expect(element.value).toBe("abc@1")

})

test('check login btn',()=> {

    
  render(<Login />)
  
  
  const btn=screen.getByText(/loginbtn/i);

 expect(btn).toBeInTheDocument()

})

  