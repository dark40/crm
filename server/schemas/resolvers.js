const { AuthenticationError } = require('apollo-server-express');
const { User, Case, Note } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
            }

            throw new AuthenticationError('Not logged in');
        },
        cases: async () => {
            return await Case.find().populate(
                {
                    path: 'notes',
                    populate: 'note'
                },
                {
                    path: 'user',
                    populate: 'user'
                }
            );
        },
        case: async (parent, { _id }) => {
            return await Case.findById(_id).populate(
                {
                    path: 'notes',
                    populate: 'note'
                },
                {
                    path: 'user',
                    populate: 'user'
                }
            );
        },
        notes: async () => {
            return await Note.find();
        },
        note: async (parent, { _id }) => {
            return await Note.findById(_id);
        }

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (paren, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user }
        },
        addCase: async
    }
};

module.exports = resolvers;