import React from 'react';

import computerplant from './images/computerplant.png';


import {
NotFoundContainer,
NotFoundImage,
NotFoundText
} from './Styling/not-found-styling';

const NotFound = () => {

    return (


    <NotFoundContainer>
        <NotFoundText>404</NotFoundText>
        <NotFoundText>Page not found</NotFoundText>
        <NotFoundImage src={computerplant} />
    </NotFoundContainer>
    )
}

export default NotFound;