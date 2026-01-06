import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Countdown from './Countdown';

describe('Countdown', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date());
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('updates the countdown every second', () => {
        const futureDate = new Date(Date.now());
        futureDate.setFullYear(futureDate.getFullYear() + 1)

        render(<Countdown countFromDate={futureDate} />);

        const countdown = screen.getByTestId('countdown');
        const firstRender = countdown.textContent;

        act(() => {
            vi.advanceTimersToNextTimer();
        });        

        const secondRender = countdown.textContent;

        expect(secondRender).not.toEqual(firstRender);
    });

    it('never goes below zero', () => {
        const pastDate = new Date(Date.now() - 1000);

        render(<Countdown countFromDate={pastDate} />);

        const countdown = screen.getByTestId('countdown');

        expect(countdown.textContent).toContain('Seconds: 0');
    });
});
