import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type CronLogDocument = HydratedDocument<CronLog>;
export type CronLogModel = Model<CronLogDocument>;

@Schema({
    collection: 'cron_log',
    autoIndex: true,
    timestamps: true,
})
export class CronLog {
    @Prop({ index: 1 })
    name: string;

    @Prop()
    status: boolean;

    @Prop()
    time: number;

    @Prop()
    createdAt: Date;
}

export const CronLogSchema = SchemaFactory.createForClass(CronLog);
