import conf from "@/conf";
import { Account, Client, Databases, Permission } from "appwrite";

const client = new Client();
client.setEndpoint(conf.appwrite.url).setProject(conf.appwrite.projectId);

const databases = new Databases(client);
const account = new Account(client);
const permission = new Permission(client);

export { client, databases, account, permission };
