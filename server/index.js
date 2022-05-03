const express = require('express');
const helper = require('./helper');

const PORT = process.env.PORT || 3001;

const app = express();


app.get('/', function (req, res) {
    res.render('index', {});
});

// make the call to the provided API (https://hs-resume-data.herokuapp.com/v3/candidates/all_data_b1f6-acde48001122)
app.get('/candidates', (req, res) => {
    helper.make_API_call('https://hs-resume-data.herokuapp.com/v3/candidates/all_data_b1f6-acde48001122')
    // sort the candidates by name
    .then(data => data.sort((a, b) => a.contact_info.name.formatted_name.localeCompare(b.contact_info.name.formatted_name)))
    // sort each candidate's experience by start date
    .then(data => data.map(candidate => {
        candidate.experience.sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date));
        return candidate;
    }))
    // return the sorted candidates
    .then(data => res.json(data))
    // catch any errors
    .catch(err => console.log(err));
}
);

// create an api endpoint for /api/ that replies "Hello World!" in a json format
app.get('/api', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
