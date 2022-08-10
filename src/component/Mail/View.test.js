import React from 'react';
import { render,screen,act, waitFor } from '@testing-library/react';
import { View } from './View';





test("render api",async()=> { 

    render(<View />)

    await waitFor(()=> {
        screen.ge
    })

})




