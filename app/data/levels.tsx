import React from 'react';
import { InlineMath } from 'react-katex';

export interface Question {
    id: number;
    type: string;
    q: string;
    p: string;
    a: string;
    easyClue: string | React.ReactNode;
    hardClue: string;
    visualComponent?: React.ReactNode;
    image?: string;
    options?: string[];
}

export const levels: { id: number; name: string; questions: Question[] }[] = [
    {
        id: 1,
        name: "Level 1",
        questions: [
            {
                id: 1,
                type: "text",
                q: "What is the next term in this sequence: 1, 11, 21, 1211, 111221, ?",
                p: "Term...",
                a: "312211",
                easyClue: "Read the digits aloud.",
                hardClue: ""
            },
            {
                id: 2,
                type: "text",
                q: "How many 6-digit numbers have at least 1 even digit?",
                p: "Answer...",
                a: "884375",
                easyClue: "Use the method of complements (counting the unrequested objects).",
                hardClue: "",
                // image: "/extracted_images-000.png"
            },
            {
                id: 3,
                type: "text",
                q: "At 3:20, what is the angle between the hour and minute hands? (Answer in degrees, e.g., 20 , Give me just the number, no word is required.)",
                p: "Degrees...",
                a: "20",
                easyClue: "Calculate angle for both hands keeping in mind the fact that both hands are moving continuously.",
                hardClue: ""
            },
            {
                id: 4,
                type: "text",
                q: "You have 5 lines and 10 balls and are asked to arrange them in such a way that each line has only 4 balls and not more or less. What is the name of the design? (Just give the figure name)",
                p: "Design...",
                a: "Star",
                easyClue: "If every requirement seems impossible, some things must be shared.",
                hardClue: ""
            },
            {
                id: 5,
                type: "text",
                q: "Cross out 10 digits from the number 1234512345123451234512345 so that the remaining no. is as large as possible.",
                p: "Number...",
                a: "55341234512345",
                easyClue: "We want as many 5's left as possible.",
                hardClue: ""
            },
        ]
    },
    {
        id: 2,
        name: "Level 2",
        questions: [
            {
                id: 6,
                type: "text",
                q: "On an island, every person either always tells truth or always lies. You meet two people, A and B. A says: \"At least one of us is a liar.\" B says: \"A is a liar.\" Who is the liar?",
                p: "Answer...",
                a: "B",
                easyClue: "Test both possibilities for A.",
                hardClue: ""
            },
            {
                id: 7,
                type: "text",
                q: "Vishal met Reddy after a long time, he was pushing around two identical twins. When Reddy was asked by Vishal how he was doing after his marriage, Reddy answered that he is the happy father of his 3 sons. When asked about their age, he answered that the product of their age is 72, and the sum of ages is the birth DATE of Vishal which is on 14th January 1984. When he asked for any more information, he answered that one of his sons is playing piano. What is the age of his youngest child?",
                p: "Number...",
                a: "3",
                easyClue: "The piano detail is not about music. It’s about being able to point to one specific child.",
                hardClue: ""
            },
            {
                id: 8,
                type: "text",
                q: "(72, 99) -> 27\n(27, 45) -> 18\n(18, 39) -> 21\n(21, 36) -> ?\n(?, 28) -> 13\n(13, 21) -> 7. Find the missing no. based on the above pattern.",
                p: "Number...",
                a: "12",
                easyClue: "The pattern is extremely simple (think fundamental mathematical operations).",
                hardClue: ""
            },
            {
                id: 9,
                type: "text",
                q: "3 humans and 3 demons need to cross a river. There is only a single boat which can carry a maximum of 2 heads and the boat can't row without any head. Now what is the minimum number of boat rowing required to cross the river, provided if at any side, no. of demons are greater than that of no. of humans, demons will eat them and you lose.",
                p: "Number...",
                a: "11",
                easyClue: "Humans should never be left outnumbered.",
                hardClue: ""
            },
            {
                id: 10,
                type: "text",
                q: "Julius came to know that Brutus is going to assasinate him. But the doors to the Roman town hall has been locked and he has to decode this to escape – BQDOQBFDAZ. What is the real password?",
                p: "Password...",
                a: "Perceptron",
                easyClue: "Caesar cipher with shift > 10.",
                hardClue: ""
            },
        ]
    },
    {
        id: 3,
        name: "Level 3",
        questions: [
            {
                id: 11,
                type: "text",
                q: "A computer program searches for a secret number stored in memory. The number lies between 1 and 100, inclusive. The program follows a method where each comparison can only tell whether the guessed number is too high, too low, or correct. The programmer wants to guarantee that the correct number is found in the worst case, no matter what the number is. What is the minimum number of comparisons required to guarantee finding the number?",
                p: "Number...",
                a: "7",
                easyClue: "Each comparison reduces the range of possible values.",
                hardClue: ""
            },
            {
                id: 12,
                type: "text",
                q: "What is the minimum no. of weights which enable us to weigh any integer number of grams of gold from 1 to 100 on a standard balance with two pans? Weights may be placed only on the left pan.",
                p: "Number...",
                a: "63", // Keeping strictly to PDF solution, though technically it's usually 7 weights (1,2,4...64). PDF says 63.
                easyClue: "Think about the binary representation of integers.",
                hardClue: ""
            },
            {
                id: 13,
                type: "text",
                q: "Uvi and Arush sat in front of each other at a round table to play a game with coins. The rule of the game is very simple: both will place the coins alternatively anywhere on the table. One round consists of - Player A placing the coin and then player B placing the coin. No one can place more than one coin in a round. Also no coin can overlap other coins and the game ends if one can’t place any more coin in the table. Who has the highest chance of winning the game if Uvi starts?",
                p: "Name...",
                a: "Uvi",
                easyClue: "The second player should not try to be creative - only consistent.",
                hardClue: ""
            },
            {
                id: 14,
                type: "text",
                q: "If you have a number of non uniform inflammable wire, which burns out in an hour, what would be the minimum no. of wires required to measure a time of about 75 mins. Point to note that non uniform inflammable means that if a wire burns out in an hour, it is not necessary that 50% of the wire is burnt out in half an hour, or quarter of the wire burns out in 15 mins.",
                p: "Number...",
                a: "3 wires",
                easyClue: "You can control how long a wire lasts only by choosing how many ends you light.",
                hardClue: ""
            },
            {
                id: 15,
                type: "text",
                q: "3 × 4 = 8\n4 × 5 = 50\n5 × 6 = 30\n6 × 7 = 49\n7 × 8 = ?",
                p: "Number...",
                a: "228",
                easyClue: "Find gcd of some kind of their product and 6 (for each).",
                hardClue: ""
            },
        ]
    },
    {
        id: 4,
        name: "Level 4",
        questions: [
            {
                id: 16,
                type: "text",
                q: "A house has 3 bulbs in 3 rooms whose switches are placed at the basement of the house. The switches are unmarked, i.e. one can't tell which switch lights which bulb. You decide to mark the switches for your convenience. But if you light a bulb, you can't tell which bulb lights. How many times you need to leave the basement in order to mark which switch is of which bulb, provided you can switch on any number of bulbs at a time.",
                p: "Number...",
                a: "1",
                easyClue: "Light is not the only thing a bulb can remember.",
                hardClue: "Use time. Leave one switch on long enough, then change the others before going upstairs."
            },
            {
                id: 17,
                type: "text",
                q: "There is a 100-story building from which I have to drop two eggs and do an experiment. And the test is that if I am standing on floor N, if I drop an egg from there, the egg will break, but if I drop an egg from floor N-1, the egg will not break. So how many minimum tests do I need to take to find this Nth floor?",
                p: "Number...",
                a: "14",
                easyClue: "Your first egg decides the size of your steps. Your second egg decides the exact place.",
                hardClue: "Don't test every floor equally. Reduce your jump size each time so that the worst case stays balanced."
            },
            {
                id: 18,
                type: "text",
                q: "A man stumbles into a dark cave and sees a troll guarding 100 coins in a pile. Each coin is perfectly identical. Each coin has a silver side and a gold side. The coins are all placed with the gold side up except for twenty which are silver side up.\nThe troll says the man must create two separate piles with the same number of silver side up coins. Failure to do so will result in death.The troll then blows out his torch rendering the cave completely dark.\nThe man completes the task with 100 % certainty and is set free.How many minimum coins are in a pile after the man completed his task?\n(The man cannot see in the dark or recall the position of any silver coin)",
                p: "Number...",
                a: "20",
                easyClue: "You don’t need to know which coins are tails to control how many tails you get.",
                hardClue: "Assume a fixed number of coins for the first set and let the second set be everything else."
            },
            {
                id: 19,
                type: "text",
                q: "In a certain year there were exactly four Fridays and exactly four Mondays in a January. On what day of the week did the 20th of January fall that year?",
                p: "Day...",
                a: "Sunday",
                easyClue: "Think if Jan 1 was a certain day of the week, when would that day of the week repeat.",
                hardClue: "Try to see that what days of Jan 1 would result in January having 5 Mondays and 5 Fridays."
            },
            {
                id: 20,
                type: "text",
                q: "Out of 2000 packets of food for an Annual NYPD Event, 1 packet is poisoned by a serial killer to kill an agent to create chaos. The man in the suit, John Reese, gets this information that the event will occur after 10 hours and the poison is slow, so the death will occur after 5 hrs during the party, through Finch’s machine. He reaches the place with Detective Fuesco to stop that. But Fuesco reminded him that to determine the poisoned food through forensic will take about 12 to 13 hours within which the poison will begin its effect. So Reese asked the manager to bring a number of Guinea pigs to determine the poisoned food. What would be the minimum number of Guinea pigs required to determine the poisoned food?",
                p: "Number...",
                a: "11",
                easyClue: "Not every detail is meant to be used. Decide first what information actually matters.",
                hardClue: "Each guinea pig can answer only one yes-or-no question."
            },
        ]
    },
    {
        id: 5,
        name: "Level 5",
        questions: [
            {
                id: 21,
                type: "text",
                q: "A game pays you $1 the first time you win, $2 the second time, $4 the third time and so on, doubling each win. The probability of winning each round is 1/2 . What is the expected total payout (calculate on average if MANY games are played, write the answer in words for eg.: Zero, One point Five, Infinity etc.)?",
                p: "Answer...",
                a: "Infinity",
                easyClue: (
                    <div className="flex flex-col items-center" >
                        <p>Compute the expectation<span className="inline-block bg-white px-2 rounded text-black">< InlineMath math="\sum x p(x)" /> </span> over N games as N {'->'} infinity.</p >
                    </div>
                ),
                hardClue: "The expectation diverges."
            },
            {
                id: 22,
                type: "text",
                q: "Three friends need to reach Kolkata from Purulia, which is about 300km away in such a way, that they reach Kolkata at the same time. They only have a bike where tripling is not allowed and can carry a maximum of 2 people. Now, the bike moves at a constant speed of 30kmph while they all walk at a constant speed of 10 kmph. What is the shortest time in which all of them would reach Kolkata (at the same time) if they start their journey from Purulia at exactly 8am? (Write answer as in a 24-hr digital clock format, eg, 13:30, 07:50, 00:22 etc)",
                p: "Time...",
                a: "00:40",
                easyClue: "Bike doesnt always need to move forward and if someone has already reached at destination while the others haven’t, its not optimal.",
                hardClue: "To reach all three together in an optimal way, one of the passengers needs to get out before reaching the destination and the bike should go back to take another person."
            },
            {
                id: 23,
                type: "text",
                q: "You have 25 horses and a race track and you want to find the top 3 fast horses among them. What minimum of race is required for finding that given that at a time only 5 horses can participate in the track and you are not provided with any race instrument except a pistol for starting and ribbon at the finish line. Provided all horses run at the same speed for all races.",
                p: "Number...",
                a: "7",
                easyClue: "Don't try to find the fastest horse directly. First, eliminate the slowest ones in batches.",
                hardClue: "Race the horses in fixed groups and remember the order within each group."
            },
            {
                id: 24,
                type: "text",
                q: "A circle has 3 points chosen uniformly at random on its circumference. What is the probability that the triangle formed contains the center of the circle? (Write answer in words, eg,: if answer is 0.5 write zero point five, if answer is 2.33 write two point three three etc.)",
                p: "Probability...",
                a: "Zero point two five",
                easyClue: "Think arcs.",
                hardClue: "No arc >= 180 degrees."
            },
            {
                id: 25,
                type: "text",
                q: "You have 50 people lined up in a room as given in the image. Each person is either a truth-teller, who always tells the truth, or a liar, who always lies. Each person knows the type of everyone else. The following image shows the statements of each person. Which of the person (s) is/are lying?",
                p: "Number...",
                a: "2",
                easyClue: "Is person 50 a liar? If yes, what does that tell us about person 49?",
                hardClue: "From the first clue can we find out if 47 is a liar?",
                image: "/extracted_images-002.png"
            },
        ]
    }
];
