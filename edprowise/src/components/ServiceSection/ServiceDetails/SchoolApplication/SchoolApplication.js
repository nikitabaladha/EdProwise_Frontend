import React from 'react'
import SchoolApplicationCommonHeader from './SchoolApplicationCommonHeader';
import SchoolApplicationTabs from './SchoolApplicationTabs';
import SchoolApplicationInfoSection from './SchoolApplicationInfoSection';

const SchoolApplication = () => {
  return (
    <>
    <SchoolApplicationCommonHeader/>
    <SchoolApplicationInfoSection/>
    <SchoolApplicationTabs/>
    </>
  )
}
export default SchoolApplication;