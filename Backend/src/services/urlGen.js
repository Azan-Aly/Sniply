import { nanoid } from "nanoid";

export const urlGenerate = (length) => {
    return nanoid(length)
}