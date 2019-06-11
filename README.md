# nodejs_file

## Start the app after installing node :
cd uploader (it contains all the node module dependencies)
node index.js

## Access Home page in the below endpoint :
http://localhost:8000

## Upload a file in the below endpoint :
http://localhost:8000/uploadForm

a) Uploading files of extensions other than png,jpg and gif should throw the below error:
'Only png, jpg and gif files are allowed to upload.'

b) Uploading files of size more than 1.5 MB should throw below error:
'File size is more than 1.5 MB'

c) Uploading valid files should return the checksum of the file.
Eg.'File uploaded: checksum = 9419f2e74ad14ccebafcc442d245e22278b3b675753befeb4e9136433c4a292a'

## File existence check endpoint :

a) Use the Checksum value received from the above successful file upload scenario in the endpoint.
Eg. http://localhost:8000/9419f2e74ad14ccebafcc442d245e22278b3b675753befeb4e9136433c4a292a

b) Depending on the file existence you should get one of the below messages:
'File Exists.' or 'File does not Exist.'
