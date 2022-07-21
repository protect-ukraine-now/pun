//import { FaTelegramPlane, FaEnvelope } from 'react-icons/fa'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import style from './style.scss';
import Container from '../Container';
import copyToClipboard from '../../../utils/copyToClipboard';
import toast from '../../../utils/toast';

export default () => (
    <Container>
        <section className={style.parts_sec}>
            <div className={style.name}>
                There are 2 ways to get in touch with your representatives:
            </div>
            <div className={[style.part, style.part1]} id="act">
                <div className={style.left_part}>
                    <div className={style.title}>
                        <span>1</span>
                        <span>Use chat bot to initiate petition to your representative</span>
                    </div>
                    <div className={style.content}>
                        <p>How to do that?</p>
                        <ul>
                            <li>
                                <p>1. Click this button if you use iOS (MacOS) or Android</p>
                                <a href="https://resist.bot/petitions/PDRQYD" target="_blank" rel="noreferrer">USE CHAT BOT</a>
                            </li>
                            <li>
                                <p>2. If you have Twitter account you can request your representative through chat bot there</p>
                                <a href="https://twitter.com/messages/compose?recipient_id=835740314006511618&text=sign%20PDRQYD" target="_blank" rel="noreferrer">USE TWITTER</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={style.right_part}>
                    <div className={style.video_el}>
                        <LiteYouTubeEmbed id="j1Uml7lV_HA" webp />
                    </div>
                    <p className={style.video_el_note}>Quick Help Video</p>
                </div>
            </div>
            <div className={style.border_block}>
                <span>or</span>
            </div>
            <div className={[style.part, style.part2, style.part_flex_wrap]} id="sendletter">
                <div className={style.title_part}>
                    <div className={style.title}>
                        <span>2</span>
                        <span>Send the letter to your representative</span>
                    </div>
                    <p>How to do that?</p>
                </div>
                <div className={style.left_part}>
                    <div className={style.content}>
                        <p>For Senate</p>
                        <ul>
                            <li>1. Go to the <a href="https://www.senate.gov/states/statesmap.htm" target="_blank" rel="noreferrer">Senate site</a></li>
                            <li>2. Select your state by clicking on the map</li>
                            <li>3. Click Contact link below the senator photo</li>
                            <li>4. Send a <a href="#emailbody">letter</a> to your representative</li>
                            <li>5. Repeat for other representatives as well</li>
                            <li>
                                <div className={style.video_el}>
                                    <LiteYouTubeEmbed id="ilwO0oezkCU" webp />
                                </div>
                                <p className={style.video_el_note}>Quick Help Video</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={[style.border_block, style.border_block_vertical]}></div>
                <div className={style.right_part}>
                    <div className={style.content}>
                        <p>For House</p>
                        <ul>
                            <li>1. Go to the <a href="https://www.house.gov/representatives/find-your-representative" target="_blank" rel="noreferrer">House site</a></li>
                            <li>2. Enter your zip to find your representatives. If required - enter you address</li>
                            <li>3. Click envelope below the photo</li>
                            <li>4. Send a <a href="#emailbody">letter</a> to your representative</li>
                            <li>5. Repeat for other representatives as well</li>
                            <li>
                                <div className={style.video_el}>
                                    <LiteYouTubeEmbed id="N6Sm8OwcO4g" webp />
                                </div>
                                <p className={style.video_el_note}>Quick Help Video</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section className={style.social_sec}>
            <h3>After you are done please share this site with your friends, family and on social networks</h3>
            <div className={style.social_buttons}>
                <div className={"style.sharethis-inline-share-buttons"} />
            </div>
            <div className={style.save_block}>
                <div>Together we can save</div>
                <div>Ukrainian lives!</div>
                <div className={style.flag}>
                    <div className={style.blue} />
                    <div className={style.yellow} />
                </div>
            </div>
        </section>
        <section className={style.letter_sec} id="emailbody">
            <div className={style.title}>Send the following letter to your representative in U.S. Congress</div>
            <div className={style.letter_text}>
                <div className={style.greet}>
                    Dear [name of the representative],
                </div>
                <br />
                <div>
                    Today I am urgently asking you to actively support immediate delivery of Eastern European fighter planes to Ukraine.
                    The brave Ukrainian army and the country's heroic citizens are winning the war on the ground.
                    The problem is that Ukrainian cities are being destroyed and citizens are being murdered from the air.
                    I am requesting your urgent help in convincing the White House that immediate delivery of MIG planes to Ukraine should be the highest priority in support of a free Ukraine.
                    What we are witnessing is a genocide against the Ukrainian people.
                    We have an ability in this country and allied bases in Europe to stop these murderous attacks from the air.
                    We have a moral obligation to do so.
                    Our words are meant to reinforce President Zelenskyy's urgent demands for fighter planes.
                    Ukrainian cities are lying in ruins and thousands of civilians are dead and will keep dying because Ukraine is denied fighter jets.
                    <b>
                        These planes are defensive, NOT offensive weapons: they will protect Ukrainian sky from Russian air raids.
                    </b>
                </div>
                <br />
                <div>
                    There are MiG 29 warplanes sitting at allied bases in Europe, ready for an immediate transfer.
                    Ukrainian pilots are well-trained on these warplanes and can use them to stop these murderous attacks from the air tonight!
                </div>
                <br />
                <div>
                    We can no longer stand back and watch schools, hospitals, homes, apartment buildings, bomb shelters, every day people of all ages being mass murdered on a daily basis.
                    The news that a mother in labor and her unborn baby died after a maternity ward was bombed in Mariupol broke my heart.
                    It is a tragedy that could have been prevented if Ukraine had the planes to defend its sky.
                    I give you my word, I am about to become a single issue voter.
                    My support in any upcoming election will be based on your immediate action to address this gap in Ukraine's defense.
                    I know, you deal with many requests, but this is an existential need - Ukraine will not survive without your support.
                    Nothing matters more to me at this moment.
                </div>
                <br />
                <div className={style.bst_wishes}>
                    Sincerely,<br />
                    [your name]
                </div>
            </div>
            <div className={style.copy_btn} onClick={() => {
                copyToClipboard('.letter_text');
                toast('Copied to clipboard');
            }}>
                COPY TO CLIPBOARD
            </div>
        </section>
    </Container>
);
