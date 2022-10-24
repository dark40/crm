import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CASE } from '../../utils/mutations';
import { QUERY_CASE } from '../../utils/queries';

import Auth from '../../utils/auth';

const CaseForm = () => {
    const [firstName, setFirstName] = useState('');

    const []
}