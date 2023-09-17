class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludeFiles = ['page', 'sort', 'limit', 'fields'];
      //Exclude pagination fields from the query string
      excludeFiles.forEach((el) => delete queryObj[el]);
  
      //1-B:ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
      //Use of Regular expressions
      //Replace gte, lte, etc in the querystring with the mongoose counterparts
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sorting() {
      if (this.queryString.sort) {
        const sortby = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortby);
        //mongoose query object property "sort"
        //For multiple sort factors just like "price age" -->
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
        //Again a query object property to limit the fields to send back
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      //Query object property
      return this;
    }
  }
  
  module.exports = APIFeatures;