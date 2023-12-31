import * as fs from "fs";
import { simpleGit, CleanOptions } from 'simple-git';

export async function listDirectoryContent(path){
    return new Promise((resolve,reject)=>{
        fs.readdir(path,(err,items)=> err ? reject(err) : resolve(items));
    })
}
export async function getItemsDetails(path,items){
    const repositories = [];
    const directories = [];
    const files = [];
    items.forEach(item => {
        const itemPath = path + "\\" + item;
        if(fs.lstatSync(itemPath).isDirectory()){
            if(fs.readdirSync(itemPath).includes(".git")){
                repositories.push({"local":item, "path": itemPath});
            }
            else{
                directories.push(item);
            }
        }
        else{
            files.push(item);
        }
    });
    return {repositories,directories,files};
}
export async function listRemoteNames(gitPath){
    try {
        const remote = await simpleGit(gitPath).getRemotes();
        return remote.map(item=>item.name).join(", ");
    } catch (error) {
        console.error(gitPath +" - " + error);
        return "";
    }
}
export async function listRemoteUrls(gitPath){
    try {
        return await simpleGit(gitPath).listRemote(['--get-url']);
    } catch (error) {
        console.error(gitPath +" - " + error);
        return "";
    }
}
export async function listCurrentBranch(gitPath){
    try {
        const branch = await simpleGit(gitPath).branch();
        return branch.current;
    } catch (error) {
        console.error(gitPath +" - " + error);
        return "";
    }
}