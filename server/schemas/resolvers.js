const { AuthenticationError } = require('apollo-server-express');
const { User, Case, Note } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id);
        },
        cases: async () => {
            return await Case.find().populate('notes').populate('users');

        },
        case: async (parent, { _id }) => {
            return await Case.findById(_id).populate('notes').populate('users');
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
        addCase: async (parent, args) => {
            return await Case.create({ ...args });
        },
        updateCase: async (parent, args) => {
            return await Case.findByIdAndUpdate(args._id, { ...args }, { new: true });
        },
        removeCase: async (parent, args) => {
            return await Case.findOneAndDelete({ _id: args._id });
        },
        addNote: async (parent, { content }) => {
            return await Note.create({ content })
        },
        addNoteToCase: async (parent, { caseId, noteId }) => {
            return await(
                Case.findOneAndUpdate(
                    { _id: caseId },
                    { $addToSet: { notes: { _id: noteId } }, },
                    { new: true }
                )
            )
        },
        addUserToCase: async (parent, { caseId, userId }) => {
            return await (
                Case.findOneAndUpdate(
                    { _id: caseId },
                    { $addToSet: { users: { _id: userId } }, },
                    { new: true }
                )
            )
        },
        removeUserFromCase: async (parent, { caseId, userId }) => {
            return await (
                Case.findOneAndUpdate(
                    { _id: caseId },
                    { $pull: { users: { $in: [{_id: userId}] }, }, },
                    { new: true }
                )
            )
        },
        updateNote: async (parent, args) => {
            return await Note.findByIdAndUpdate(args._id, args, { new: true });
        },
        removeNote: async (parent, args) => {
            return await Note.findOneAndDelete({ _id: args._id })
        },
    }
};

module.exports = resolvers;