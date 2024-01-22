import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {  validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { AuthorRepository } from '../repository/authorRepository';
import { ApplicationError } from '../errors/applicationError';
import Author from "../models/author.model";
import { AuthorInterface } from '../DTO/interfaces';

// TODO: Refactor this to utilize services and repositories as in the other controllers
export class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', { session: false }, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            // For demo purposes this is left here, but in it should be moved into env and you should use a more secure secret
            const JWT_SECRET = 'supersecuresecret'; 
            
            req.login(user, { session: false }, (error) => {
                if (error) {
                    return res.status(500).json({ message: 'Server error' });
                }
            
                const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
            
                return res.json({ token });
            });
        })(req, res);
    }

    async register (req: Request, res: Response)  {
        try {
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { username, password, role, authorId } = req.body;
    
            const existingUser = await UserModel.findOne({ username });
    
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);

            let author: AuthorInterface | null= null;
          
            if (role === 'Author' && !authorId) {
                const newAuthor = new Author ({
                    authorName: username,
                    birthDate: new Date(),
                });
                author = await AuthorRepository.create(newAuthor);

            } else if (role === 'Author' && authorId) {
        
                author = await Author.findById(authorId);
                if (!author) {
                    return res.status(400).json({ message: 'Author does not exist' });
                }
            } else {
                throw new ApplicationError('Invalid role', 400)
            } 

            const newUser = new UserModel({
                username,
                password: hashedPassword,
                role,
                author: author ? author.id : null,
            });
    
            await newUser.save();
    
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
      }
}