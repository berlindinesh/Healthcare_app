const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: null }, // Optional profile picture for users
    password: {
        type: String,
        required: function () {
            return this.provider === "local"; // Only require password for local (email/password) users
        },
    },
    provider: {
        type: String, // Can be 'local', 'google', 'github', 'linkedin'
        default: "local",
    },
    googleId: {
        type: String, // For storing Google user IDs
        default: null,
    },
    githubId: {
        type: String, // For storing GitHub user IDs
        default: null,
    },
    linkedinId: {
        type: String, // For storing LinkedIn user IDs
        default: null,
    },
    otp: {
        type: String, // OTP for email verification
        default: null,
    },
    otpExpiration: {
        type: Date, // Expiration time for OTP
        default: null,
    },
    isVerified: { 
        type: Boolean, 
        default: false, // Indicates whether the user has verified their email
    },
    role: { 
        type: String, 
        enum: ['admin', 'doctor', 'patient'], 
        default: 'patient' 
    },
    phone: { type: String, default: null },
    
    // Updated Fields for password reset
    resetPasswordToken: { 
        type: String, 
        default: null, 
    },
    resetPasswordExpires: { 
        type: Date, 
        default: null, 
    },
    
    createdAt: { 
        type: Date, 
        default: Date.now, // Automatically set user creation time
    },
    updatedAt: { 
        type: Date, 
        default: Date.now, // Automatically update on modification
    },
});

// Middleware to update the 'updatedAt' field on any document modification
UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);
