/*
* Author: satanic-devil
* This is only for video streaming video files in the current directory:
* current supported files are mp4
*
*/

let http = require('http');
let fileSystem = require('fs');
let path = require('path');
let url = require('url');

//Initialise data of all the files
let fileNames = [];
let fileSizes = {};
const portNumber = 8124;

initializeFiles();

http.createServer( startListening ).listen( portNumber );

console.log("Server Started : http://127.0.0.1:"+portNumber);

function startListening( request, response){

	let fileName = decodeURI(url.parse( request.url, true).path.substring(1));

	console.log( fileName);
	if( fileName ){
		fileSystem.stat(fileName, (err,file)=>{
			if( err ){
				response.writeHead(203);
				response.end('\n');
				return;
			}
			if( fileName == "style.css"){
				fileSystem.createReadStream(fileName).pipe(response);	
				return;
			}
			streamFile( request.headers,response, fileName);
		});
	} else {
		response.writeHead(200,{
			'Content-type':'text/html'
		});
		addCSS(response);
		displayAllVideos(response);
	}
	
}

function displayAllVideos(response){

	for( let i=0; i<fileNames.length; i++){
		response.write(
		"<a href=\""+fileNames[i]+"\">"+fileNames[i]+"</a>"

		);
		
	}
	response.write("</body></html>");
	response.end('\n');
}

function addCSS(response){
	response.write(
		"<html><head><link rel=stylesheet href=style.css /></head><body>"
	);
}


function streamFile( headers, response, fileName){
	let start = 0, end = fileSizes[fileName]-1;
	
	let filePath = path.join( __dirname, fileName);
	if( headers.range ){

	start = parseInt(headers.range.substring(headers.range.indexOf("=")+1));
	response.writeHead(206,{
		'Accept-Ranges':' bytes',
		'Content-Length':fileSizes[fileName]-start,
		'Content-Range':' bytes '+start+'-'+end+'/'+fileSizes[fileName],
		'Content-Type':' video/mp4',
	});
	} else {
		response.writeHead(200,{
		'Accept-Ranges':'bytes',
		'Content-Length':fileSizes[fileName],
		'Content-Type':'video/mp4',
	});
	}
	
	
	let readStream = fileSystem.createReadStream( filePath, {start:start, end:end});
	readStream.pipe( response );
}

function initializeFiles(){
	let files = fileSystem.readdirSync( '.');
	for( let file in files){
		let fileName = files[file];
		
		if( fileName.indexOf('.mp4') != -1){
			fileNames.push( fileName );
			fileSizes[fileName] = fileSystem.statSync(fileName).size;
		}
	}
}