import { fireEvent, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import { Mail } from "./Mail" 
// test('renders login heading', () => {
//     render(<Login />);
//     const linkElement = screen.getByText(/Loginform/i);
//     expect(linkElement).toBeInTheDocument();
//   });
  
  test('renders send email', () => {
    render(<Mail />);
    const linkElement = screen.getByText(/To/i);
    expect(linkElement).toBeInTheDocument();
    const email=screen.getByLabelText(/To:/i)
    expect(email).toHaveAttribute('type','email')
  });

  test('renders subject', () => {
    render(<Mail />);
    
    const subject=screen.getByLabelText(/subject/i)
    expect(subject).toHaveAttribute('type','text')
  });

  test('renders body', () => {
    render(<Mail />);
    
    const btn=screen.getByRole("button")
    expect(btn).toBeInTheDocument()
  })


  test('should be able to type in sibject  input',()=>{
    
    const handleChange = jest.fn();
  const {getByTestId} = render(<Mail handleChange={handleChange}/>);
  const input = getByTestId('test-input');
//   input.value = 'TEST VALUE';
//   fireEvent.change(input);
fireEvent.change(input, { target: { value: 'TEST VALUE' } });
//   expect(handleChange).toHaveBeenCalledTimes(1);


})

test('should be able to type in email input',()=>{
    
    const handleChange1 = jest.fn();
  const {getByTestId} = render(<Mail handleChange1={handleChange1}/>);
  const input = getByTestId('test-input1');
//   input.value = 'TEST VALUE';
//   fireEvent.change(input);
fireEvent.change(input, { target: { value: 'TEST VALUE' } });
//   expect(handleChange).toHaveBeenCalledTimes(1);


})

//   test('should be able to type in login password input',()=>{
//     render(<Login />)

//     const element=screen.getByLabelText(/password:/i)
// fireEvent.change(element,{target:{value:"abc@1"}})
// expect(element.value).toBe("abc@1")

// })

// test('check login btn',()=> {

    
//   render(<Login />)
  
  
//   const btn=screen.getByText(/loginbtn/i);

//  expect(btn).toBeInTheDocument()

// })

  