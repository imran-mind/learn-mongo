
### Practical Mongo DB Tutorial

* How to connect to database

* syntax
    ```js
    use <db_name>
    ```

* Example
    ```js
    use sample_training
    ```

* Show collections

    ```js
    show collections
    ```

    * you can see all the collections of database
    ```js
    companies
    grades
    inspections
    posts
    routes
    trips
    zips
    ```


### INSERT

* Insert one Document

    ```js
    db.grads.insertOne({
        student_id: 3133,
        scores: [
            {
            type: "quiz",
            score: 10,
            },
        ],
    });
    ```

    * Output of the above command

    ```js
    [
    {
        _id: ObjectId("64a443b0af47f709c9607cc8"),
        student_id: 3133,
        scores: [ { type: 'quiz', score: 10 } ]
    }
    ]
    ```

* Insert Many Documents

    ```js
        db.grads.insertMany([
            {
                student_id: 1,
                scores: [
                {
                    type: "quiz",
                    score: 10,
                },
                ],
            },
            {
                student_id: 2,
                scores: [
                {
                    type: "quiz",
                    score: 10,
                },
                ],
            },
        ]);

    ```
       
    * Output of the above command

    ```js
    {
    acknowledged: true,
    insertedIds: {
        '0': ObjectId("64a448d5af47f709c9607cca"),
        '1': ObjectId("64a448d5af47f709c9607ccb")
    }
    }
    ```


* FIND 

    ```js
        db.collection.find()

        db.zips.find()
    ```

    Fetches all the documents who matches the condition
    ```js
     db.zips.find({state:"AL"})
    ```

    Find a Document by Using the $in Operator.
    Use the $in operator to select documents where the value of a field equals any value in the specified array. Here's an example:

```js
db.zips.find({ city: { $in:["PHOENIX""CHICAGO"]}})
```

* Finding Documents by Using Comparison Operators

  Review the following comparison operators: $gt, $lt, $lte, and $gte.

    **$gt** =>
    Use the $gt operator to match documents with a field greater than the given value. For example:

    ```js
        db.sales.find({ "items.price": { $gt: 50}})
    ```

    **$lt** =>
    Use the $lt operator to match documents with a field less than the given value. For example:

    ```js
        db.sales.find({ "items.price": { $lt: 50}})
    ```

    **$lte** =>
    Use the $lte operator to match documents with a field less than or equal to the given value. For example:

    ```js
        db.sales.find({ "customer.age": { $lte: 65}})
    ```
    **$gte** =>
    Use the $gte operator to match documents with a field greater than or equal to the given value. For example:

    ```js
        db.sales.find({ "customer.age": { $gte: 65}})
    ```

* Querying on Array Elements in MongoDB

    Review the following code, which demonstrates how to query array elements in MongoDB.

    Find Documents with an Array That Contains a Specified Value
    In the following example, "InvestmentFund" is not enclosed in square brackets, so MongoDB returns all documents within the products array that contain the specified value.

    ```js
    db.accounts.find({ products: "InvestmentFund"})
    ```
    Find a Document by Using the $elemMatch Operator
    Use the $elemMatch operator to find all documents that contain the specified subdocument. For example:

    ```js
    db.sales.find({
        items: {
            $elemMatch: { name: "laptop", price: { $gt: 800 }, quantity: { $gte: 1 } },
        },
    })
    ```


* Finding Documents by Using Logical Operators

    Review the following logical operators: implicit $and, $or, and $and.

    Find a Document by Using Implicit $and
    Use implicit $and to select documents that match multiple expressions. For example:

    ```js
    db.routes.find({ "airline.name": "Southwest Airlines", stops: { $gte: 1 } })
    ```
    Find a Document by Using the $or Operator
    Use the $or operator to select documents that match at least one of the included expressions. For example:

    ```js
    db.routes.find({
        $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }],
    })
    ```
    Find a Document by Using the $and Operator

    Use the $and operator to use multiple $or expressions in your query.

    ```js
    db.routes.find({
    $and: [
        { $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }] },
        { $or: [{ "airline.name": "American Airlines" }, { airplane: 320 }] },
    ]
    })
    ```

* Replacing a Document in MongoDB [**UPDATING**]

    To replace documents in MongoDB, we use the replaceOne() method. The replaceOne() method takes the following parameters:

    * **filter**: A query that matches the document to replace.

    * **replacement**: The new document to replace the old one with.
    * **options**: An object that specifies options for the update.


    ```js
    db.books.replaceOne(
    {
        _id: ObjectId("6282afeb441a74a98dbbec4e"),
    },
    {
        title: "Data Science Fundamentals for Python and MongoDB",
        isbn: "1484235967",
        publishedDate: new Date("2018-5-10"),
        thumbnailUrl:
        "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
        authors: ["David Paper"],
        categories: ["Data Science"],
    }
    )```




* Updating MongoDB Documents by Using updateOne()

    The updateOne() method accepts a filter document, an update document, and an optional options object. MongoDB provides update operators and options to help you update documents. In this section, we'll cover three of them: $set, upsert, and $push.

    **$set**

    The $set operator replaces the value of a field with the specified value, as shown in the following code:

    ```js
    db.podcasts.updateOne(
        {
            _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8"),
        },

        {
            $set: {
            subscribers: 98562,
            },
        }
    )
    ```
    **upsert**

    The upsert option creates a new document if no documents match the filtered criteria. Here's an example:

    ```js
    db.podcasts.updateOne(
        { title: "The Developer Hub" },
        { $set: { topics: ["databases", "MongoDB"] } },
        { upsert: true }
    )
    ```
    **$push**

    The $push operator adds a new value to the hosts array field. Here's an example:

    ```js
    db.podcasts.updateOne(
        { _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8") },
        { $push: { hosts: "Nic Raboy" } }
    )
    ```

     ```js
    db.grads.updateOne(
        {_id: ObjectId("64a448d5af47f709c9607ccb")},
        {$push:{scores:{type:"sports",score:100}}}
    )
    ```


* findAndModify

    ```js
    db.grads.findAndModify({
        query:{student_id: 'imrankhan'}, 
        update: {grad_type:"AAA"},
        new: true
    })
    ```


* Updating MongoDB Documents by Using updateMany()

    To update multiple documents, use the updateMany() method. This method accepts a filter document, an update document, and an optional options object. The following code shows an example:

    ```js
    db.grads.updateMany(
        {student_id: 3133}, 
        {$set: {status:"ACTIVE"}}
    )
    ```

* Deleting Documents in MongoDB

    To delete documents, use the **deleteOne()** or **deleteMany()** methods. Both methods accept a filter document and an options object.

    Delete One Document

    The following code shows an example of the deleteOne() method:

    ```js
    db.podcasts.deleteOne(
        { _id: Objectid("6282c9862acb966e76bbf20a") }
    )
    ```
    Delete Many Documents

    The following code shows an example of the deleteMany() method:

    ```js
     db.podcasts.deleteMany({category: “crime”})
    ```


* **Sorting and Limiting Query Results in MongoDB**

    Review the following code, which demonstrates how to sort and limit query results.

    **Sorting Results**

    Use cursor.sort() to return query results in a specified order. Within the parentheses of sort(), include an object that specifies the field(s) to sort by and the order of the sort. Use 1 for ascending order, and -1 for descending order.

    Syntax:

    ```js
    db.collection.find(<query>).sort(<sort>)
    ```

    Example:

    ```js
    // Return data on all music companies, sorted alphabetically from A to Z.
    db.companies.find({ category_code: "music" }).sort({ name: 1 });
    ```
    To ensure documents are returned in a consistent order, include a field that contains unique values in the sort. An easy way to do this is to include the _id field in the sort. Here's an example:

    ```js
    // Return data on all music companies, sorted alphabetically from A to Z. Ensure consistent sort order
    db.companies.find({ category_code: "music" }).sort({ name: 1, _id: 1 });
    ```
    Limiting Results
    
    Use cursor.limit() to return query results in a specified order. Within the parentheses of limit(), specify the maximum number of documents to return.

    Syntax:

    ```js
    db.companies.find(<query>).limit(<number>)
    ```
    
    Example:

    ```js
    // Return the three music companies with the highest number of employees. Ensure consistent sort order.
    db.companies
    .find({ category_code: "music" })
    .sort({ number_of_employees: -1, _id: 1 })
    .limit(3);
    ```


* Returning Specific Data from a Query in MongoDB

    Review the following code, which demonstrates how to return selected fields from a query.

    Add a Projection Document
    
    To specify fields to include or exclude in the result set, add a projection document as the second parameter in the call to ```db.collection.find().```

    Syntax:

    ```js
    db.collection.find( <query>, <projection> )
    ```
    **Include a Field**

    To include a field, set its value to 1 in the projection document.

    Syntax:

    ```js
    db.collection.find( <query>, { <field> : 1 })
    ```
    Example:

    ```js
    // Return all restaurant inspections - business name, result, and _id fields only
    db.inspections.find(
        { sector: "Restaurant - 818" },
        { business_name: 1, result: 1 }
    )
    ```
    **Exclude a Field**

    To exclude a field, set its value to 0 in the projection document.

    Syntax:

    ```js
    db.collection.find(query, { <field> : 0, <field>: 0 })
    ```
    Example:

    ```js
    // Return all inspections with result of "Pass" or "Warning" - exclude date and zip code
    db.inspections.find(
        { result: { $in: ["Pass", "Warning"] } },
        { date: 0, "address.zip": 0 }
    )
    ```
    While the _id field is included by default, it can be suppressed by setting its value to 0 in any projection.

    ```js
    // Return all restaurant inspections - business name and result fields only
    db.inspections.find(
        { sector: "Restaurant - 818" },
        { business_name: 1, result: 1, _id: 0 }
    )
    ```

* Counting Documents in a MongoDB Collection

    Review the following code, which demonstrates how to count the number of documents that match a query.

    **Count Documents**

    Use db.collection.countDocuments() to count the number of documents that match a query. countDocuments() takes two parameters: a query document and an options document.

    **Syntax:**

    ```js
    db.collection.countDocuments( <query>, <options> )
    ```

    The query selects the documents to be counted.

    Examples:

    ```js
    // Count number of docs in trip collection
    db.trips.countDocuments({})
    ```

    ```js
    // Count number of trips over 120 minutes by subscribers
    db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" })
    ```


* Inserting a Document in Node.js Applications

    Review the following code, which demonstrates how to insert a single document and multiple documents into a collection.


    **Insert a Document**

    To insert a single document into a collection, append insertOne() to the collection variable. The insertOne() method accepts a document as an argument and returns a promise. In this example, the document that's being inserted is stored in a variable called sampleAccount, which is declared just above the main() function.

    ```js
    const dbname = "bank"
    const collection_name = "accounts"
 
    const accountsCollection = client.db(dbname).collection(collection_name)

    const sampleAccount = {
        account_holder: "Linus Torvalds",
        account_id: "MDB829001337",
        account_type: "checking",
        balance: 50352434,
    }

    const main = async () => {
        try {
            await connectToDatabase()
            // insertOne method is used here to insert the sampleAccount document
            let result = await accountsCollection.insertOne(sampleAccount)
            console.log(`Inserted document: ${result.insertedId}`)
        } catch (err) {
            console.error(`Error inserting document: ${err}`)
        } finally {
            await client.close()
        }
    }
    main()
    ```

    **Insert Many Documents**

    To insert more than one document, append the insertMany() method to the collection object, and then pass an array of documents to the insertMany() method. The insertMany() method returns a promise. We await the promise to get the result of the operation, which we then use to log the number of documents that are inserted to the console. In this example, the accounts to be inserted are stored in an array variable called sampleAccounts. This variable is defined just above the main() function.

    ```js
    const dbname = "bank"
    const collection_name = "accounts"
    
    const accountsCollection = client.db(dbname).collection(collection_name)

    const sampleAccounts = [
    {
        account_id: "MDB011235813",
        account_holder: "Ada Lovelace",
        account_type: "checking",
        balance: 60218,
    },
    {
        account_id: "MDB829000001",
        account_holder: "Muhammad ibn Musa al-Khwarizmi",
        account_type: "savings",
        balance: 267914296,
    },
    ]
    
    const main = async () => {
        try {
            await connectToDatabase()
            let result = await accountsCollection.insertMany(sampleAccounts)
            console.log(`Inserted ${result.insertedCount} documents`)
            console.log(result)
        } catch (err) {
            console.error(`Error inserting documents: ${err}`)
        } finally {
            await client.close()
        }
    }

    main()
    ```


* Deleting Documents in Node.js Applications

    Review the following code, which demonstrates how to delete documents in MongoDB with Node.js.


    **Using deleteOne()**

    To delete a single document from a collection, use the deleteOne() method on a collection object. This method accepts a query filter that matches the document that you want to delete. If you do not specify a filter, MongoDB matches and deletes the first document in the collection. Here's an example:

    ```js
    const dbname = "bank"
    const collection_name = "accounts"

    const accountsCollection = client.db(dbname).collection(collection_name)

    const documentToDelete = { _id: ObjectId("62d6e04ecab6d8e13049749c") }

    const main = async () => {
        try {
            await connectToDatabase()
            let result = await accountsCollection.deleteOne(documentToDelete)
            result.deletedCount === 1
            ? console.log("Deleted one document")
            : console.log("No documents deleted")
        } catch (err) {
            console.error(`Error deleting documents: ${err}`)
        } finally {
            await client.close()
        }
    }

    main()
    ```

    **Using deleteMany()**
    
    You can delete multiple documents from a collection in a single operation by calling the deleteMany() method on a collection object. To specify which documents to delete, pass a query filter that matches the documents that you want to delete. If you provide an empty document, MongoDB matches all documents in the collection and deletes them. In the following example, we delete all accounts with a balance of less than 500 by using a query filter. Then, we print the total number of deleted documents.


    ```js
    const dbname = "bank"
    const collection_name = "accounts"

    const accountsCollection = client.db(dbname).collection(collection_name)

    const documentsToDelete = { balance: { $lt: 500 } }

    const main = async () => {
        try {
            await connectToDatabase()
            let result = await accountsCollection.deleteMany(documentsToDelete)
            result.deletedCount > 0
                ? console.log(`Deleted ${result.deletedCount} documents`)
                : console.log("No documents deleted")
        } catch (err) {
            console.error(`Error deleting documents: ${err}`)
        } finally {
            await client.close()
        }
    }
    
    main()
    ```



* ## **Introduction to MongoDB Aggregation** ##

    This section contains key definitions for this lesson, as well as the code for an aggregation pipeline.

    **Definitions**

    * **Aggregation**: Collection and summary of data

    * **Stage**: One of the built-in methods that can be completed on the data, but does not permanently alter it

    * **Aggregation pipeline**: A series of stages completed on the data in order

    ###    Structure of an Aggregation Pipeline

    ```js
    db.collection.aggregate([
        {
            $stage1: {
                { expression1 },
                { expression2 }...
            },
            $stage2: {
                { expression1 }...
            }
        }
    ])
    ```


* ### **Using $match and $group Stages in a MongoDB Aggregation Pipeline**

    Review the following sections, which show the code for the $match and $group aggregation stages.

    * **$match**

    The $match stage filters for documents that match specified conditions. Here's the code for $match:

    ```js
    {
        $match: {
            "field_name": "value"
        }
    }
    ```

    * **$group**
    The $group stage groups documents by a group key.

    ```js
    {
      $group:
        {
        _id: <expression>, // Group key
        <field>: { <accumulator> : <expression> }
        }
    }
    ```

    * **$match and $group in an Aggregation Pipeline**

    The following aggregation pipeline finds the documents with a field named "state" that matches a value "CA" and then groups those documents by the group key "$city" and shows the total number of zip codes in the state of California.

    ```js
    db.zips.aggregate([
        {   
            $match: { 
                state: "CA"
            }
        },
        {
            $group: {
                _id: "$city",
                totalZips: { $count : { } }
            }
        }
    ])
    ```

* Using $sort and $limit Stages in a MongoDB Aggregation Pipeline

    Review the following sections, which show the code for the $sort and $limit aggregation stages.

    **$sort**

    The $sort stage sorts all input documents and returns them to the pipeline in sorted order. We use 1 to represent ascending order, and -1 to represent descending order.

    ```js
    {
        $sort: {
            "field_name": 1
        }
    }
    ```

    **$limit**
    The $limit stage returns only a specified number of records.

    ```js
    {
        $limit: 5
    }
    ```

    $sort and $limit in an Aggregation Pipeline

    The following aggregation pipeline sorts the documents in descending order, so the documents with the greatest pop value appear first, and limits the output to only the first five documents after sorting.

    ```js
    db.zips.aggregate([
        {
            $sort: {
                pop: -1
            }
        },
        {
            $limit:  5
        }
    ])
    ```

* Using $project, $count, and $set Stages in a MongoDB Aggregation Pipeline

    Review the following sections, which show the code for the $project, $set, and $count aggregation stages.

    **$project**

    The $project stage specifies the fields of the output documents. 1 means that the field should be included, and 0 means that the field should be supressed. The field can also be assigned a new value.

    ```js
    {
        $project: {
            state:1, 
            zip:1,
            population:"$pop",
            _id:0
        }
    }
    ```

    **$set**

    The $set stage creates new fields or changes the value of existing fields, and then outputs the documents with the new fields.

    ```js
    {
        $set: {
            place: {
                $concat:["$city",",","$state"]
            },
            pop:10000
        }
    }
    ```

    **$count**
    The $count stage creates a new document, with the number of documents at that stage in the aggregation pipeline assigned to the specified field name.

    ```js
        {
            $count: "total_zips"
        }
    ```


* Creating a Single Field Index

    Review the code below, which demonstrates how to create a single field index in a collection.

    **Create a Single Field Index**
    Use createIndex() to create a new index in a collection. Within the parentheses of createIndex(), include an object that contains the field and sort order.

    ```js
    db.customers.createIndex({
        birthdate: 1
    })
    ```

    **Create a Unique Single Field Index**

    Add {unique:true} as a second, optional, parameter in createIndex() to force uniqueness in the index field values. Once the unique index is created, any inserts or updates including duplicated values in the collection for the index field/s will fail.

    ```js
    db.customers.createIndex({
        email: 1
    },
    {
        unique:true
    })
    ```
    Note: MongoDB only creates the unique index if there is no duplication in the field values for the index field/s.

    **View the Indexes used in a Collection**
    Use getIndexes() to see all the indexes created in a collection.

    ```js
    db.customers.getIndexes()
    ```

    **Check if an index is being used on a query**

    Use explain() in a collection when running a query to see the Execution plan. This plan provides the details of the execution stages (IXSCAN , COLLSCAN, FETCH, SORT, etc.).

    * The IXSCAN stage indicates the query is using an index and what index is being selected.
    * The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
    * The FETCH stage indicates documents are being read from the collection.
    * The SORT stage indicates documents are being sorted in memory.


    ```js
    db.customers.explain().find({
    birthdate: {
        $gt:ISODate("1995-08-01")
        }
    })
    ```

    ```js
    db.customers.explain().find({
        birthdate: {
            $gt:ISODate("1995-08-01")
        }
    }).sort({
        email:1
    })
    ```


* Understanding Multikey Indexes

    Review the code below, which demonstrates how multikey indexes work. If a single field or compound index includes an array field, then the index is a multikey index.


    **Create a Single field Multikey Index**

    Use createIndex() to create a new index in a collection. Include an object as parameter that contains the array field and sort order. In this example accounts is an array field.

    ```js
    db.customers.createIndex({
      accounts: 1
    })
    ```

    **View the Indexes used in a Collection**

    Use getIndexes() to see all the indexes created in a collection.

    ```js
    db.customers.getIndexes()
    ```

    **Check if an index is being used on a query**
    Use explain() in a collection when running a query to see the Execution plan. This plan provides the details of the execution stages (IXSCAN , COLLSCAN, FETCH, SORT, etc.).

    * The IXSCAN stage indicates the query is using an index and what index is being selected.
    * The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
    * The FETCH stage indicates documents are being read from the collection.
    * The SORT stage indicates documents are being sorted in memory.

    ```js
    db.customers.explain().find({
        accounts: 627788
    })
    ```


* Working with Compound Indexes

    Review the code below, which demonstrates how to create a compound index in a collection.


    **Create a Compound Index**

    Use createIndex() to create a new index in a collection. Within the parentheses of createIndex(), include an object that contains two or more fields and their sort order.

    ```js
    db.customers.createIndex({
        active:1, 
        birthdate:-1,
        name:1
    })
    ```

    **Order of Fields in a Compound Index**

    The order of the fields matters when creating the index and the sort order. It is recommended to list the fields in the following order: Equality, Sort, and Range.

    * Equality: field/s that matches on a single field value in a query
    * Sort: field/s that orders the results by in a query
    * Range: field/s that the query filter in a range of valid values
    
    The following query includes an equality match on the active field, a sort on birthday (descending) and name (ascending), and a range query on birthday too.

    ```js
    db.customers.find({
        birthdate: {
        $gte:ISODate("1977-01-01")
    },
    active:true
    }).sort({
      birthdate:-1, 
      name:1
      })
    ```

    Here's an example of an efficient index for this query:

    ```js
    db.customers.createIndex({
        active:1, 
        birthdate:-1,
        name:1
    })
    ```

    **View the Indexes used in a Collection**

    Use getIndexes() to see all the indexes created in a collection.


    ```js
    db.customers.getIndexes()
    ```

   **Check if an index is being used on a query**
    
    Use explain() in a collection when running a query to see the Execution plan. This plan provides the details of the execution stages (IXSCAN , COLLSCAN, FETCH, SORT, etc.). Some of these are:

  * The IXSCAN stage indicates the query is using an index and what index is being selected.
  * The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
  * The FETCH stage indicates documents are being read from the collection.
  * The SORT stage indicates documents are being sorted in memory.

  ```js
    db.customers.explain().find({
        birthdate: {
        $gte:ISODate("1977-01-01")
    },
  active:true
  }).sort({
    birthdate:-1,
    name:1
    })
  ```


  **Cover a query by the Index**

  An Index covers a query when MongoDB does not need to fetch the data from memory since all the required data is already returned by the index.

    In most cases, we can use projections to return only the required fields and cover the query. Make sure those fields in the projection are in the index.

    By adding the projection {name:1,birthdate:1,_id:0} in the previous query, we can limit the returned fields to only name and birthdate. These fields are part of the index and when we run the explain() command, the execution plan shows only two stages:

    * IXSCAN - Index scan using the compound index
    * PROJECTION_COVERED - All the information needed is returned by the index, no need to fetch from memory


    ```js
    db.customers.explain().find({
    birthdate: {
        $gte:ISODate("1977-01-01")
        },
    active:true
    },
    {name:1,
        birthdate:1, 
        _id:0
    }).sort({
        birthdate:-1,
        name:1
        })
    ```


* Deleting an Index

    Review the code below, which demonstrates how to delete indexes in a collection.

    **View the Indexes used in a Collection**

    Use getIndexes() to see all the indexes created in a collection. There is always a default index in every collection on _id field. This index is used by MongoDB internally and cannot be deleted.

    ```js
    db.customers.getIndexes()
    ```

    **Delete an Index**

    Use dropIndex() to delete an existing index from a collection. Within the parentheses of dropIndex(), include an object representing the index key or provide the index name as a string.

    Delete index by name:

    ```js
    db.customers.dropIndex(
    'active_1_birthdate_-1_name_1'
    )
    ```

    Delete index by key:

    ```js
    db.customers.dropIndex({
        active:1,
        birthdate:-1, 
        name:1
    })
    ```

    **Delete Indexes**

    Use dropIndexes() to delete all the indexes from a collection, with the exception of the default index on _id.


    ```js
    db.customers.dropIndexes()
    ```
    The dropIndexes() command also can accept an array of index names as a parameter to delete a specific list of indexes

    ```js
    db.collection.dropIndexes([
    'index1name', 'index2name', 'index3name', 'index4name'
    ])
    ```

