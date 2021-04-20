import { InjectedEntity } from '@adr-express-ts/core/lib/@types';
import { Entity, Inject, Retrieve } from '@adr-express-ts/core';

@Inject
@Entity('Demo')
export default class DemoEntity implements InjectedEntity {
  @Retrieve('Mongoose')
  private mongoose?: any;

  // -- For Tests --
  private _loaded: boolean = false;

  public get IsLoaded() {
    return this._loaded;
  }

  async onLoad(): Promise<void> {
    this._loaded = true; // -- For Tests --

    if (!this.mongoose) {
      return;
    }

    // Here you have to initialize your model.
    // The order of execution is onLoad (from entities) -> onReady (from classes)
    // Once loaded, most of the ORMs already have your model saved in a variable
    // (Mongoose have mongoose.models)
    // If you need the entity class, you can use
    // @Retrieve('Entity.{NAME_HERE}')
    // Mongoose is not installed by default, if you need to use mongoose,
    // in index.ts, at the variables category, use
    // Injector.inject('Mongoose', mongoose, InjectType.Variable);

    // e.g. there is a Mongoose model example:

    // const { ObjectId } = Schema as any;

    // this.mongoose.model('User', new Schema({
    //   id: ObjectId,
    //   email: {
    //     type: String,
    //     min: 3,
    //     max: 255,
    //     required: true
    //   },
    //   password: {
    //     type: String,
    //     min: 8,
    //     required: true
    //   }
    // }));
  }
}
