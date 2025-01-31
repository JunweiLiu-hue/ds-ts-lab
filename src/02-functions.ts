import {Friend, Colleague, EmailContact } from './myTypes'
import { friends,colleagues } from './01-basics';

function older(f: Friend) : string {
    f.age += 1
    return `${f.name} is now ${f.age}` 
}

function allOlder(friendsArray: Friend[]): string[] {
    return friendsArray.map(friend => {
        friend.age += 1;
        return `${friend.name} is now ${friend.age}`;
    });
}

console.log(older(friends[0]))
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) { // Inferred retun type
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }
  
  function addColleague(
    cs: Colleague[],
    name: string,
    department: string,
    email: string
): void {
    const highest = highestExtension(cs);
    const newExtension = highest.contact.extension + 1;

    const newColleague: Colleague = {
        name,
        department,
        contact: {
            email,
            extension: newExtension,
        },
    };

    cs.push(newColleague);
}



console.log(highestExtension(colleagues.current));
addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max? : number
  ): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) {
       end = max < 2 ? 1 : max
    }
    const sorted = colleagues.sort(sorter);
    const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0,end)
  }
  // Test invocations
  console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
  console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW
  
  
  function findFriends(friendsArray: Friend[], condition: (friend: Friend) => boolean): string[] {
    return friendsArray
        .filter(condition)  
        .map(friend => friend.name);  
}
console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

function addInterest(friend: Friend, interest: string): string[] {
    if (!friend.interests) {
        friend.interests = [];
    }

    friend.interests.push(interest);
    return friend.interests;
}

console.log(addInterest(friends[1], 'Politics'));
