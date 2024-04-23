import conf from "@/conf";
import { Account, Client, Databases, Permission, Teams } from "node-appwrite";

export default class AppwriteServerService {
  /** @type {Client} */
  client;

  /** @type {Databases} */
  databases;

  /** @type {Account} */
  account;

  /** @type {Teams} */
  teams;

  /** @type {Permission} */
  permission;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwrite.url)
      .setProject(conf.appwrite.projectId)
      .setKey(conf.appwrite.apiKey);

    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
    this.teams = new Teams(this.client);
    this.permission = new Permission(this.client);
  }
}
