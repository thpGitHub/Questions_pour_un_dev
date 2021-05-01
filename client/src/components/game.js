import './game.css'

const Game = () => {

    return (
        <main id="container_playground">
            <section id="playground">
                <header id="timer">
                    <article id="timer_number">15</article>
                </header>
                <aside id="side_left">Joueur 1
                    <div>nom 1</div>
                    <p>score :<span id="score_player_two"> 0</span></p>
                </aside>
                <aside id="side_middle">
                    <section id="message">
                        <div id="message_one_player">message one player</div>
                        <div id="message_all_players">message all players</div>
                    </section>
                    <section id="question">
                        <h2>Question</h2>
                        <p>Ici la question</p>
                    </section>
                    <section id="responses">
                        <div id="response_a"></div>
                        <div id="response_b"></div>
                        <div id="response_c"></div>
                        <div id="response_d"></div>
                    </section>
                </aside>
                <aside id="side_right">Joueur 2
                    <div>nom 2</div>
                    <p>score :<span id="score_player_two"> 0</span></p>
                </aside>    
            </section>
        </main>
    );
}

export default Game;