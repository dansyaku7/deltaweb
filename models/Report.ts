import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IReport extends Document {
  coverData: any;
  activeTemplates: any[];
}

const ReportSchema: Schema = new Schema({
  coverData: {
    type: Object,
    required: true,
  },
  activeTemplates: {
    type: Array,
    required: true,
  },
}, {
  timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Mencegah model dibuat ulang setiap kali ada hot-reload
const Report = models.Report || model<IReport>('Report', ReportSchema);

export default Report;
