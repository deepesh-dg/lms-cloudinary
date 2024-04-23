import conf from "@/conf";
import { Account, Client, Databases, Permission } from "appwrite";

export default class AppwriteService {
  /** @type {Client} */
  client;

  /** @type {Databases} */
  databases;

  /** @type {Account} */
  account;

  /** @type {Permission} */
  permission;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwrite.url)
      .setProject(conf.appwrite.projectId);

    this.databases = new Databases(this.client);
    this.account = new Account(this.client);
    this.permission = new Permission(this.client);
  }
}
