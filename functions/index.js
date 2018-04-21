const functions = require('firebase-functions');
const admin = require('firebase-admin');
const rp = require('request-promise');
const request = require('request');

admin.initializeApp();

exports.fotballCompetitions = functions.https.onRequest((req, res) => {

    const options = {
        uri: 'https://api.football-data.org/v1/competitions',
        headers: {
            'X-Auth-Token': '16014d84207e48e7938c2baec0f93333'
        },
        json: true
    }

    return rp(options).then(result => {
        result.forEach(league => {
            admin.firestore().doc(`footballData/competitions/data/${league.id}`).set(league, { merge: true });
        });
        return res.send(result)
    }).catch(err => {
        console.log(err)
        return res.send(err);
    })
});

exports.addFixtures = functions.firestore.document('fotballData/competitions/data/{leagueID}').onCreate((snap, context) => {
    const options = {
        uri: `https://api.football-data.org/v1/competitions/${snap.id}/fixtures?timeFrame=n7`,
        headers: {
            'X-Auth-Token': '16014d84207e48e7938c2baec0f93333'
        },
        json: true
    }
    return rp(options).then(result => {

        let fixtures = result["fixtures"];

        fixtures.forEach(fixture => {

            let competitionID = Number(fixture._links.competition.href.split('/').pop());
            let fixtureID = Number(fixture._links.self.href.split('/').pop());
            let homeTeamID = Number(fixture._links.homeTeam.href.split('/').pop());
            let awayTeamID = Number(fixture._links.awayTeam.href.split('/').pop());
            //console.log(competitionID, fixtureID, homeTeamID, awayTeamID);

            admin.firestore().doc(`footballData/fixtures/${competitionID}/${fixtureID}`).set({
                competitionID: competitionID,
                fixtureID: fixtureID,
                homeTeam: {
                    id: homeTeamID,
                    name: fixture.homeTeamName
                },
                awayTeam: {
                    id: awayTeamID,
                    name: fixture.awayTeamName
                },
                date: fixture.date,
                status: fixture.status,
                matchday: fixture.matchday,
                result: fixture.result,
            }, { merge: true });
        });
    }).catch(err => {
        console.log(err)
    })
})

exports.getNextFixtures = functions.https.onRequest((req, res) => {
    const options = {
        uri: `https://api.football-data.org/v1/fixtures?timeFrame=n7`,
        headers: {
            'X-Auth-Token': '16014d84207e48e7938c2baec0f93333'
        },
        json: true
    }
    return rp(options).then(result => {
        let fixtures = result["fixtures"];

        for (fixture in fixtures) {
            let ref;

            let competitionID = Number(fixture._links.competition.href.split('/').pop());
            let fixtureID = Number(fixture._links.self.href.split('/').pop());
            let homeTeamID = Number(fixture._links.homeTeam.href.split('/').pop());
            let awayTeamID = Number(fixture._links.awayTeam.href.split('/').pop());

            if (fixture.status == 'FINISHED') {
                ref = admin.firestore().doc(`footballData/fixtures/finished/${fixtureID}`);
            } else if (fixture.status == 'IN_PLAY') {
                ref = admin.firestore().doc(`footballData/fixtures/live/${fixtureID}`);
            } else if (fixture.status == 'TIMED') {
                ref = admin.firestore().doc(`footballData/fixtures/timed/${fixtureID}`);
            } else {
                ref = admin.firestore().doc(`footballData/fixtures/postponed/${fixtureID}`);
            }

            ref.set({
                competitionID: competitionID,
                fixtureID: fixtureID,
                homeTeam: {
                    id: homeTeamID,
                    name: fixture.homeTeamName
                },
                awayTeam: {
                    id: awayTeamID,
                    name: fixture.awayTeamName
                },
                date: fixture.date,
                status: fixture.status,
                matchday: fixture.matchday,
                result: fixture.result,
            }, { merge: true });
        }
        return res.send(result);
    }).catch(err => {
        console.log(err)
    });
});

exports.getPastFixtures = functions.https.onRequest((req, res) => {
    const options = {
        uri: `https://api.football-data.org/v1/fixtures?timeFrame=p7`,
        headers: {
            'X-Auth-Token': '16014d84207e48e7938c2baec0f93333'
        },
        json: true
    }
    return rp(options).then(result => {
        let fixtures = result["fixtures"];

        for (fixture in fixtures) {
            let ref;

            let competitionID = Number(fixture._links.competition.href.split('/').pop());
            let fixtureID = Number(fixture._links.self.href.split('/').pop());
            let homeTeamID = Number(fixture._links.homeTeam.href.split('/').pop());
            let awayTeamID = Number(fixture._links.awayTeam.href.split('/').pop());

            if (fixture.status == 'FINISHED') {
                ref = admin.firestore().doc(`footballData/fixtures/finished/${fixtureID}`);
            } else if (fixture.status == 'IN_PLAY') {
                ref = admin.firestore().doc(`footballData/fixtures/live/${fixtureID}`);
            } else if (fixture.status == 'TIMED') {
                ref = admin.firestore().doc(`footballData/fixtures/timed/${fixtureID}`);
            } else {
                ref = admin.firestore().doc(`footballData/fixtures/postponed/${fixtureID}`);
            }

            ref.set({
                competitionID: competitionID,
                fixtureID: fixtureID,
                homeTeam: {
                    id: homeTeamID,
                    name: fixture.homeTeamName
                },
                awayTeam: {
                    id: awayTeamID,
                    name: fixture.awayTeamName
                },
                date: fixture.date,
                status: fixture.status,
                matchday: fixture.matchday,
                result: fixture.result,
            }, { merge: true });
        }
    }).catch(err => {
        console.log(err)
    });

    res.status(200).send('done');
});

exports.getWorldCup = functions.https.onRequest((req, res) => {
    const id = 467;

    const teams = {
        uri: `https://api.football-data.org/v1/competitions/467/teams`,
        headers: {
            'X-Auth-Token': '16014d84207e48e7938c2baec0f93333'
        },

    }
    const matches = {
        uri: `https://api.football-data.org/v1/competitions/467/fixtures`,
        headers: {
            'X-Auth-Token': '16014d84207e48e7938c2baec0f93333'
        },

    }

    let teamsObj;
    request(teams, (error, response, body) => {
        if (!error & response.statusCode == 200) {
            let data = JSON.parse(body);
            let teams = data['teams'];
            console.log(teams);
            teams.forEach(team => {
                let teamID = Number(team._links.self.href.split('/').pop());

                admin.firestore().doc(`footballData/teams/${id}/${teamID}`).set({
                    teamID: teamID,
                    name: team.name,
                    code: team.code,
                    shortName: team.shortName,
                    crestUrl: team.crestUrl
                }, { merge: true });
            })

            request(matches, (error, response, body) => {
                if (!error & response.statusCode == 200) {
                    let data = JSON.parse(body);
                    let matches = data['fixtures'];
                    console.log(matches);
                    matches.forEach(fixture => {
                        let competitionID = Number(fixture._links.competition.href.split('/').pop());
                        let fixtureID = Number(fixture._links.self.href.split('/').pop());
                        let homeTeamID = Number(fixture._links.homeTeam.href.split('/').pop());
                        let awayTeamID = Number(fixture._links.awayTeam.href.split('/').pop());

                        let homeTeam = teams.filter(team => Number(team._links.self.href.split('/').pop()) === homeTeamID)[0];
                        let awayTeam = teams.filter(team => Number(team._links.self.href.split('/').pop()) === awayTeamID)[0];

                        if (homeTeamID != 757 || awayTeamID != 757) {
                            admin.firestore().doc(`footballData/fixtures/data/${fixtureID}`).set({
                                competitionID: competitionID,
                                fixtureID: fixtureID,
                                homeTeam: {
                                    id: homeTeamID,
                                    name: fixture.homeTeamName,
                                    crestUrl: homeTeam.crestUrl,
                                    code: homeTeam.code,
                                    shortName: homeTeam.shortName,
                                },
                                awayTeam: {
                                    id: awayTeamID,
                                    name: fixture.awayTeamName,
                                    crestUrl: awayTeam.crestUrl,
                                    code: awayTeam.code,
                                    shortName: awayTeam.shortName
                                },
                                date: fixture.date,
                                status: fixture.status,
                                matchday: fixture.matchday,
                                result: fixture.result,
                            }, { merge: true });
                        }
                    })
                    res.status(200).send("done");
                } else {
                    console.log(error);
                    res.status(304).send(error);
                }
            })
        } else {
            console.log(error);
            res.status(304).send(error);
        }
    });
});

exports.calculateScores = functions.firestore
    .document('footballData/fixtures/data/{fixtureID}')
    .onUpdate((change, context) => {
        // Get an object representing the current document
        const newValue = change.after.data();
        const fixtureID = context.params.fixtureID
        if(newValue.status === 'FINISHED') {
            return admin.firestore().doc(`footballData/competition/data/${fixtureID}`).get().then(data => {
                /* data.data().tournaments.forEach(tournament => {
                    admin.firestore().collection(`tournaments/${tournament}/users`).get().then(data => {
                        console.log(data.data());
                    })
                }) */
                console.log(data.data())
            }).catch(error => {
                console.log(error);
            })
        } else {
            return false
        }
    });