import React from 'react';

const ViewMode = ({allList: _allList, ...props}) => <div>{JSON.stringify(props, null, 2)}</div>;
export default ViewMode;
