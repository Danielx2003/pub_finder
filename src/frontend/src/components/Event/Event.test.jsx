import React from 'react';
import { render, screen } from '@testing-library/react';
import Event from './Event';
import { describe, it, expect } from 'vitest';

describe('Event', () => {
    it('Renders the name', () => {
        render(<Event 
            name={'Event 1'}
            datetime={new Date(2024, 2, 10, 2, 30)}
            />);
        const name = screen.getByText('Event 1');
        expect(name).toBeInTheDocument();
    })

    it('Renders Date and Time', () => {
        render(<Event 
            name={'Event 1'}
            datetime={new Date(2024, 2, 10, 2, 30)}
            />);
        const datetime = screen.getByText('March 10, 2024');
        expect(datetime).toBeInTheDocument();
    })

    // it('Renders countdown till event', () => {
    //     let dateNow = new Date()
    //     dateNow.setFullYear(dateNow.getFullYear() + 1)

    //     render(<Event 
    //         name={'Event 1'}
    //         datetime={dateNow}
    //         />);
    //     const countdown = screen.getByRole('Countdown');
    //     expect(countdown).toBeInTheDocument();
    // })
});