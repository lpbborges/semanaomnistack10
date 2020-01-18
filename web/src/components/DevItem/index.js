import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function DevItem({ dev }) {
  return (
    <li key={dev.github_username} className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

DevItem.propTypes = {
  dev: PropTypes.shape({
    github_username: PropTypes.string,
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    techs: PropTypes.arrayOf(PropTypes.string),
    bio: PropTypes.string,
  }).isRequired,
};
