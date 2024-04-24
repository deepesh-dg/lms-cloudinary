import conf from "@/conf";
import { Account, Client, Databases, Permission, Teams } from "node-appwrite";

const client = new Client();
client
  .setEndpoint(conf.appwrite.url)
  .setProject(conf.appwrite.projectId)
  .setKey(conf.appwrite.apiKey);

const databases = new Databases(client);
const account = new Account(client);
const teams = new Teams(client);
const permission = new Permission(client);

export { client, databases, account, teams, permission };
