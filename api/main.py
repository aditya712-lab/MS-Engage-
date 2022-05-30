import imp
import json, sys




import flask
from flask import Flask,abort
from flask_cors import CORS, cross_origin
from numpy import record
from requests import request
import dataset as dt






app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "", "allow_headers": "", "expose_headers": ""}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/movies/", methods=["POST", "OPTIONS"])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def sendreq():
	# getting the parameters from the request
	req = flask.request.json
	if "count" not in req:
		req["count"] = 10

	# printing for debugging

	print(req,file=sys.stderr)
	# return data.head(req["count"]).to_json(orient='records')
	var=dt.search_byname(dt.data,req["count"])
	return var.to_json(orient='records')




@app.route("/recommend/", methods=["POST", "OPTIONS"])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def getreclist():
	# getting the parameters from the request
	req = flask.request.json
	name=req['name']
	count=int(req['count'])
	reclist=dt.recommend(name,count)

	# printing for debugging

	print(req,file=sys.stderr)
	# return data.head(req["count"]).to_json(orient='records')
	
	return json.dumps(reclist)


@app.route('/search/', methods=["POST", "OPTIONS"])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def extra():
    req = flask.request.json
    value = req["value"]
    response = dt.category(value)
    return response.head(5).to_json(orient = "records")



@app.route('/genres/', methods=["POST", "OPTIONS"])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def genres():
    # req = flask.request.json
    # value = req["value"]
    # response = dt.category(value)
    return json.dumps(dt.genreList)


# print(dt.genreList)



@app.route("/genresearch/", methods=["POST", "OPTIONS"])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def getgenremovie():
	# getting the parameters from the request
	req = flask.request.json
	genres = req["genres"]

	var=dt.searchByGenre(dt.data, genres)
	return var.to_json(orient='records')

if(__name__=='__main__'):
    app.run(debug=True)


