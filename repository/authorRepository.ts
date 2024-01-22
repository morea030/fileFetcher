import  AuthorModel, { IAuthor } from "../models/author.model";
import { AuthorInterface } from "../DTO/interfaces";
import { ApplicationError } from "../errors/applicationError";

export class AuthorRepository { 
    public static async create(newAuthor: IAuthor): Promise<AuthorInterface> {
        try {
            const author = await AuthorModel.create(newAuthor);
            const authorCreated : AuthorInterface = {  
                id: author._id,
                authorName: author.authorName,
                birthDate: author.birthDate
            };
            return authorCreated;
        } catch (error) {
            const errorMsg = `AuthorRepository.create: ${error}`
            throw new ApplicationError(errorMsg, 500);
        }
    }

    public static async findById(id: string): Promise<AuthorInterface | null> {
        try{
            const author = await AuthorModel.findById(id);
            if (!author) {
                return null;
            }
            const fetchedAuthor: AuthorInterface = {
                id: author._id,
                authorName: author.authorName,
                birthDate: author.birthDate
            }
            return fetchedAuthor;
        } catch (error) {
            const errorMsg = `AuthorRepository.findById: ${error}`
            throw new ApplicationError(errorMsg, 500);
        }
    };


    public static async findAll(): Promise<IAuthor[]> {
            const authors = AuthorModel.find();
            return authors;
        };

    public static async update(id: string, author: AuthorInterface): Promise<AuthorInterface | null> {
        try {
            const authorUpdated = await AuthorModel.findByIdAndUpdate(id, author)
            if (!authorUpdated) {   
                return null;
            };
            const updatedAuthor: AuthorInterface = {
                id: authorUpdated._id,
                authorName: authorUpdated.authorName,
                birthDate: authorUpdated.birthDate
            }
            return updatedAuthor;
        }
        catch (error) {
            const errorMsg = `AuthorRepository.update: ${error}`
            throw new ApplicationError(errorMsg, 500);
        }
    };
    

    public static async delete(id: string): Promise<void> {
        try {   
            const authorDeleted = AuthorModel.findByIdAndDelete(id);
        } catch (error) {
            const errorMsg = `AuthorRepository.delete: ${error}`
            throw new ApplicationError(errorMsg, 500);
        };
    }
}