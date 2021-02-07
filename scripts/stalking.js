$(document).ready(main);
function main() {
    let handle = null;
    if ((new URLSearchParams(window.location.search)).has('handle')) handle = (new URLSearchParams(window.location.search)).get('handle');
    if (!handle) return;

    $("#handle").text(handle);
    $(".currently-stalking").removeClass("hide");
    $("#loading-gif").removeClass("hide");

    let previousProblemId = null;
    let previousVerdict = null;
    let failedFetch = 0;

    const clearFetchInterval = () => clearInterval(fetchInteval);

    const playAudio = (message) => {
        if (message) window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    }

    const translateVerdict = (verdict) => {
        if (verdict === "OK") return "Accepted";
        else if (verdict === "WRONG_ANSWER") return "Wrong Answer";
        else if (verdict === "COMPILATION_ERROR") return "Compilation Error";
    }

    const setRecentSubmission = (problemId, verdict) => {
        $(".previous-state #problem-id").text(problemId);
        $(".previous-state #verdict").text(translateVerdict(verdict));
        $(".previous-state").removeClass("hide");
    }

    const setUpdateBox = (prevId, prevVer, presentId, presentVer) => {
        const msg = `New submission: ${prevId} ${translateVerdict(prevVer)} -> ${presentId} ${translateVerdict(presentVer)}`;
        $(".updates").removeClass("hide");
        $(".updates #update-msg").text(msg);
        setTimeout(() => {
            $(".updates").addClass("hide");
        }, 10000);
    }

    const fetchInteval = setInterval(() => {
        if (failedFetch >= 5) {
            console.log('failed to fetch atleast 5 times');
            clearFetchInterval();
            return;
        }
        $.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1`, function (data) {
            const status = data.status;
            if (status != "OK") {
                failedFetch++;
                console.log('Failed to fetch data');
            } else {
                let { verdict } = data.result[0];
                data = data.result[0].problem;
                let { contestId, index } = data;
                let problemId = contestId + index;

                if (previousProblemId !== null && previousVerdict !== null && verdict != "TESTING" && (previousProblemId + previousVerdict) !== (problemId + verdict)) {
                    // should handle same submission made again
                    let transVerdict = translateVerdict(verdict);
                    playAudio(`${transVerdict} on problem ${index} of contest ${contestId}`);
                    setUpdateBox(previousProblemId, previousVerdict, problemId, verdict);
                }
                previousProblemId = problemId;
                previousVerdict = verdict;
                setRecentSubmission(previousProblemId, previousVerdict);
            }
        });
    }, 1000);
}