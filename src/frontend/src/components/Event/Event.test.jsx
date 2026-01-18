import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import { render, screen } from '@testing-library/react';
import Event from './Event';
import { describe, it, expect } from 'vitest';

describe('Event', () => {
    it('Renders the name', () => {
        render(
            <BrowserRouter>
                <Event
                    id={'1'}
                    name={'Event 1'}
                    datetime={new Date(2024, 2, 10, 2, 30)}
                />
            </BrowserRouter>
        );
        const name = screen.getByText('Event 1');
        expect(name).toBeInTheDocument();
    })

    it('Renders Date and Time', () => {
        render(
            <BrowserRouter>
                <Event
                    id={'1'}
                    name={'Event 1'}
                    datetime={new Date(2024, 2, 10, 2, 30)}
                />
            </BrowserRouter>
        );
        const datetime = screen.getByText('March 10, 2024');
        expect(datetime).toBeInTheDocument();
    })

    it('Renders countdown till event', () => {
        let dateNow = new Date()
        dateNow.setFullYear(dateNow.getFullYear() + 1)

        render(
            <BrowserRouter>
                <Event
                    id={'1'}
                    name={'Event 1'}
                    datetime={new Date(2024, 2, 10, 2, 30)}
                />
            </BrowserRouter>
        );
        const countdown = screen.getByTestId('countdown');
        expect(countdown).toBeInTheDocument();
    })

    it('Renders back button', () => {
        let dateNow = new Date()
        dateNow.setFullYear(dateNow.getFullYear() + 1)

        render(
            <BrowserRouter>
                <Event
                    id={'1'}
                    name={'Event 1'}
                    datetime={new Date(2024, 2, 10, 2, 30)}
                />
            </BrowserRouter>
        );
        const countdown = screen.getByText('Back');
        expect(countdown).toBeInTheDocument();
    })
});
