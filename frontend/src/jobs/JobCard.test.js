import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import JobCard from './JobCard';
import UserContext from '../UserContext';

const job = {
  id: 1,
  title: 'Software Engineer',
  salary: 100000,
  equity: 0.1,
  companyName: 'Example Co.',
};

const applyToJob = jest.fn();

const hasAppliedToJob = jest.fn(() => false);

const userContextValues = {
  hasAppliedToJob,
  applyToJob,
};

test('renders without crashing', () => {
  render(
    <UserContext.Provider value={userContextValues}>
      <JobCard {...job} />
    </UserContext.Provider>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <UserContext.Provider value={userContextValues}>
      <JobCard {...job} />
    </UserContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('applies to job', () => {
  const { getByText } = render(
    <UserContext.Provider value={userContextValues}>
      <JobCard {...job} />
    </UserContext.Provider>
  );

  const applyButton = getByText('Apply');
  fireEvent.click(applyButton);
  expect(applyToJob).toHaveBeenCalledTimes(1);
  expect(applyToJob).toHaveBeenCalledWith(job.id);
});

