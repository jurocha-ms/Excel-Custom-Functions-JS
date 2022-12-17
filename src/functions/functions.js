/* eslint-disable @typescript-eslint/no-unused-vars */
/* global console setInterval, clearInterval */

/**
 * Add two numbers
 * @customfunction
 * @param {number} first First number
 * @param {number} second Second number
 * @returns {number} The sum of the two numbers.
 */
function add(first, second) {
  return first + second;
}

/**
 * Displays the current time once a second
 * @customfunction
 * @param {CustomFunctions.StreamingInvocation<string>} invocation Custom function invocation
 */
function clock(invocation) {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Returns the current time
 * @returns {string} String with the current time formatted for the current locale.
 */
function currentTime() {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param {number} incrementBy Amount to increment
 * @param {CustomFunctions.StreamingInvocation<number>} invocation
 */
function increment(incrementBy, invocation) {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param {string} message String to write.
 * @returns String to write.
 */
function logMessage(message) {
  console.log(message);

  return message;
}

/**
 * Gets the star count for a given Github repository.
 * @customfunction
 * @param {string} userName string name of Github user or organization.
 * @param {string} repoName string name of the Github repository.
 * @return {number} number of stars given to a Github repository.
 */
async function getStarCount(userName, repoName) {
  try {
    //You can change this URL to any web request you want to work with.
    const url = "https://api.github.com/repos/" + userName + "/" + repoName;
    const response = await fetch(url);
    //Expect that status code is in 200-299 range
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonResponse = await response.json();
    return jsonResponse.watchers_count;
  } catch (error) {
    return error;
  }
}

/**
 * Gets member groups.
 * @customfunction
 * @return {string} number of stars given to a Github repository.
 */
async function aagetMemberGroups(method = 1) {
  var result = "[NONE]";
  try {
    await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();

      if (0 === method) {
        xhr.open("GET", "https://raw.githubusercontent.com/microsoft/v8-jsi/master/config.json", true);
      } else {
        xhr.open("POST", "https://graph.microsoft.com/v1.0/me/getMemberGroups", true);

        xhr.setRequestHeader("authorization", "Bearer xyz");
        xhr.setRequestHeader("content-type", "application/json");
      }

      xhr.onload = (e) => {
        resolve(xhr.response);
        result = "[LOAD] " + e.currentTarget.responseText;
      };
      xhr.onerror = (e) => {
        resolve(undefined);
        result = "[ERR] " + e.currentTarget.responseText;
      };

      xhr.send();
      // xhr.send("foo=bar&lorem=ipsum");
      // xhr.send(new Int8Array());
      // xhr.send(document);
    });

    //result = response;

    return result;
  } catch (error) {
    return error;
  }
}
